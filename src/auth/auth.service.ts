import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
const scrypt = promisify(_scrypt);
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { createDatabase } from 'typeorm-extension';
import { VendorShops } from '../controllers/vendor/entities/vendorShop.entity';
import { Order } from '../controllers/orders/entities/order.entity';
import { ShopFruits } from '../controllers/shop/entities/shopFruits.entity';
import { ShopVegetables } from '../controllers/shop/entities/shopVegetables.entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { customerLogger, vendorLogger } from '../app.module';
import { Address } from './entities/user-address.entity';

@Injectable()
export class AuthService {

  private _dataSource: BehaviorSubject<DataSource> = new BehaviorSubject<DataSource>(null);;
  public dataSourceObservable: Observable<DataSource>;

  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Address) private readonly address: Repository<Address>,
    private jwt: JwtService
  ) { }

  async login(loginBody: any) {

    switch (loginBody.role) {
      case 'Customer': {
        const user = await this.user.createQueryBuilder('user')
          .addSelect('user.password')
          .where('user.role = :role', { role: loginBody.role })
          .andWhere('user.email = :email', { email: loginBody.email }).getOne();

        if (!user) {
          throw new NotFoundException('User not found');
        } else {
          if (await this.verifyPassword(loginBody.password, user.password)) {
            const token = await this.jwt.signAsync({
              email: user.email,
              id: user.id
            })
            delete user.password
            customerLogger.info(JSON.stringify(user) + ' customer logged in')
            return { token, user }
          } else {
            throw new UnauthorizedException("Bad credentials")
          }
        }
      }
      case 'Vendor': {

        const dataSource = await this.getVendorDB(loginBody.vendorId)

        try {

          const vendorDB = dataSource.getRepository(User);

          const user = await vendorDB.createQueryBuilder('Users')
            .addSelect('Users.password')
            .where('Users.role = :role', { role: loginBody.role })
            .andWhere('Users.email = :email', { email: loginBody.email }).getOne();

          if (!user) {
            throw new NotFoundException('User not found');
          } else {
            if (await this.verifyPassword(loginBody.password, user.password)) {
              const token = await this.jwt.signAsync({
                email: user.email,
                id: user.id,
                vendorId: loginBody.vendorId,
              })
              delete user.password
              await dataSource.destroy()
              vendorLogger.info(JSON.stringify(user) + ' vendor logged in')
              return { token, user }
            } else {
              throw new UnauthorizedException("Bad credentials")
            }
          }

        } catch (Exception) {
          throw new BadRequestException(Exception)
        }
      }
    }
  }

  async verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
  }

  //  Register User
  async register(userBody: any) {

    /*Check if the user is already present in database, if yes, throw error */
    const checkUser = await this.user.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.role = :role', { role: userBody.role })
      .andWhere('user.email = :email', { email: userBody.email }).getOne();

    if (checkUser) {

      throw new BadRequestException('Please enter different email');
    } else {
      const user = new User();

      Object.assign(user, userBody);

      user.role = userBody.role;

      this.user.create(user); // this will run any hooks present, such as password hashing
      const savedUserDetails = await this.user.save(user);

      if (userBody?.address) {

        const address = {
          userId: savedUserDetails.id,
          title: userBody?.address,
        }

        this.address.create(address);
        await this.address.save(address);

      }

      delete user.password;
      return user;
    }

  }

  async generateHash(password: string) {
    // Hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const hashedPassword = salt + '.' + hash.toString('hex');
    return hashedPassword;
  }

  setDataSource(dataSource) {
    this._dataSource.next(dataSource);
  }

  getDataSource(): Observable<DataSource> {
    return this._dataSource.asObservable()
  }

  async getVendorDB(vendorId: number, create?: boolean) {
    const options: DataSourceOptions = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql',
      database: "vendor_db_" + vendorId,
      synchronize: true,
      entities: [User, VendorShops, Order, ShopFruits, ShopVegetables]
    };

    if (create === true) {
      await createDatabase({
        options
      });
    }

    const dataSource = new DataSource(options);
    if (!dataSource.isInitialized) {
      await dataSource.initialize()
    }
    this.setDataSource(dataSource);

    return dataSource;
  }

}
