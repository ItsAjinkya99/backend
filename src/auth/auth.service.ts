import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { UserRoles } from './user-roles';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
const scrypt = promisify(_scrypt);
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Shop } from 'src/controllers/shop/entities/shop.entity';
import { createDatabase, useDataSource } from 'typeorm-extension';
import { VendorShops } from 'src/controllers/vendor/entities/vendorShop.entity';
import { Order } from 'src/controllers/orders/entities/order.entity';
import { ShopFruits } from 'src/controllers/shop/entities/shopFruits.entity';
import { ShopVegetables } from 'src/controllers/shop/entities/shopVegetables.entity';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable()
export class AuthService {

  private _dataSource: BehaviorSubject<DataSource> = new BehaviorSubject<DataSource>(null);;
  public dataSourceObservable: Observable<DataSource>;

  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,

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
            return { token, user }
          } else {
            throw new UnauthorizedException("Bad credentials")
          }
        }
      }
      case 'Vendor': {

        const options: DataSourceOptions = {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'mysql',
          database: "vendor_db_" + loginBody.vendorId,
          // autoLoadEntities: true,
          synchronize: true,
          entities: [User, VendorShops, Order, ShopFruits, ShopVegetables]
        };

        try {
          const dataSource = new DataSource(options);
          await dataSource.initialize()
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
      await this.user.save(user);

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

}
