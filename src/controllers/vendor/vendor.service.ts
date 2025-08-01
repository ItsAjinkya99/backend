import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { DataSourceOptions, Repository } from 'typeorm';
import { createDatabase } from 'typeorm-extension';
import { DataSource } from "typeorm"
import { User } from 'src/auth/entities/user.entity';
import { Fruit } from '../fruits/entities/Fruit.entity';
import { Shop } from '../shop/entities/shop.entity';
import { AuthService } from 'src/auth/auth.service';
import { take } from 'rxjs';
import { Order } from '../orders/entities/order.entity';
import { ShopFruits } from '../shop/entities/shopFruits.entity';
import { ShopVegetables } from '../shop/entities/shopVegetables.entity';
import { Vendor } from './entities/vendor.entity';
import { VendorShops } from './entities/vendorShop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopService } from '../shop/shop.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export class VendorService {

  constructor(private readonly authService: AuthService,
    private readonly shopsService: ShopService,
    @InjectRepository(Vendor) private readonly vendor: Repository<Vendor>
  ) { }
  create(createVendorDto: CreateVendorDto) {
    return 'This action adds a new vendor';
  }

  async findAll() {
    let myData = await new Promise(resolve => {
      this.authService.getDataSource().pipe(take(1)).subscribe(async (data) => {
        const vendorUsers = data.getRepository(User);
        const myQuery = await vendorUsers.find();
        resolve(myQuery)
      })
    })

    return myData
  }

  findOne(id: number) {
    return `This action returns a #${id} vendor`;
  }

  update(id: number, updateVendorDto: UpdateVendorDto) {
    return `This action updates a #${id} vendor`;
  }

  remove(id: number) {
    return `This action removes a #${id} vendor`;
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
        entities: [User, VendorShops, Order, ShopFruits, ShopVegetables]
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
      await dataSource.destroy()

      return vendorBody.vendorId
      // Object.assign(vendor, userBody);

      // do something with the DataSource
    })();[]
  }

  async createVendorShop(object) {
    let myData = await new Promise(resolve => {
      this.authService.getDataSource().pipe(take(1)).subscribe(async (data) => {

        let gotDBName = data.options.database.toString()
        let dbName = gotDBName.substring(gotDBName.length - 5, gotDBName.length)
        object.vendorId = dbName

        var shopCreated = await this.shopsService.create(object)

        if (shopCreated) {

          object.shopId = shopCreated.id
          const VendorShops1 = data.getRepository(VendorShops);
          await VendorShops1.save(object);
          resolve(shopCreated);

        }
      })
    })
    return myData
  }

  async createVendorUser(object) {
    let myData = await new Promise(resolve => {
      this.authService.getDataSource().pipe(take(1)).subscribe(async (data) => {
        const vendorUsers = data.getRepository(User);
        const myQuery = await vendorUsers.save(object);
        resolve(myQuery);
      })
    })
    return myData
  }

  async addVegetables(body: object) {
    let myData = await new Promise(resolve => {
      this.authService.getDataSource().pipe(take(1)).subscribe(async (data) => {
        const shopVegetables = data.getRepository(ShopVegetables);

        const myQuery = this.saveShopVegetables(shopVegetables, body)

        resolve(myQuery);
      })
    })
    return myData
  }

  saveShopVegetables(shopVegetables, body) {
    body.vegetables.forEach(async element => {
      let obj = {
        shopId: body.shopId,
        vegetableId: element
      }
      await shopVegetables.save(obj);

    });
  }

}