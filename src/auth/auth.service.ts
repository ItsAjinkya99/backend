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
import { vendorShop } from 'src/controllers/vendor/entities/vendorShop.entity';
import { Order } from 'src/controllers/orders/entities/order.entity';
import { ShopFruits } from 'src/controllers/shop/entities/shopFruits.entity';
import { ShopVegetables } from 'src/controllers/shop/entities/shopVegetables.entity';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {

  private _dataSource: BehaviorSubject<DataSource> = new BehaviorSubject<DataSource>(null);;
  public dataSourceObservable: Observable<DataSource>;

  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Vendor) private readonly vendor: Repository<Vendor>,
    private jwt: JwtService
  ) { }

  async login(loginBody: any) {

    switch (loginBody.role) {
      case 'Customer': {
        console.log("in customer case")
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
          // database: "vendor_db_46891",
          // autoLoadEntities: true,
          synchronize: true,
          entities: [User, Shop, vendorShop, Order, ShopFruits, ShopVegetables]
        };

        try {
          const dataSource = new DataSource(options);
          await dataSource.initialize()
          const vendorDB = dataSource.getRepository(User);

          const vendorUser = await vendorDB.createQueryBuilder('Users')
            .addSelect('Users.password')
            .where('Users.role = :role', { role: loginBody.role })
            .andWhere('Users.email = :email', { email: loginBody.email }).getOne();

          if (!vendorUser) {
            throw new NotFoundException('User not found');
          } else {
            if (await this.verifyPassword(loginBody.password, vendorUser.password)) {
              const token = await this.jwt.signAsync({
                email: vendorUser.email,
                id: vendorUser.id,
                vendorId: loginBody.vendorId,
              })
              delete vendorUser.password
              return { token, vendorUser }
            } else {
              throw new UnauthorizedException("Bad credentials")
            }
          }
        } catch (Exception) {
          throw new BadRequestException("Vendor not exist")
        }

        // this._dataSource.next(dataSource);

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

  createDB(userBody) {
    (async () => {

      const vendorId = await this.vendor.query(`SELECT FLOOR(RAND() * 99999) AS random_num
      FROM vendor
      WHERE ("random_num" NOT IN (SELECT vendorId FROM vendor))
      LIMIT 1`)

      let vendorBody = {
        vendorId: vendorId.length !== 0 ? vendorId[0].random_num : Math.floor(Math.random() * 90000) + 10000
      }

      const vendor = new Vendor();
      Object.assign(vendor, vendorBody);
      this.vendor.create(vendor);
      this.vendor.save(vendor);

      const options: DataSourceOptions = {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'mysql',
        database: "vendor_db_" + vendorBody.vendorId,
        // autoLoadEntities: true,
        synchronize: true,
        entities: [User, Shop, vendorShop, Order, ShopFruits, ShopVegetables]
      };

      // Create the database with specification of the DataSource options
      await createDatabase({
        options
      });

      const dataSource = new DataSource(options);
      await dataSource.initialize()

      const userRepo = dataSource.getRepository(User);

      const user = new User();
      Object.assign(user, userBody);

      user.role = userBody.role;

      userRepo.create(user); // this will run any hooks present, such as password hashing
      await userRepo.save(user);

      return vendorBody.vendorId
      // Object.assign(vendor, userBody);

      // do something with the DataSource
    })();[]
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

  /* getDataSource() {
    this.dataSource = this._dataSource.asObservable();
    return this.dataSource;
  } */
}
