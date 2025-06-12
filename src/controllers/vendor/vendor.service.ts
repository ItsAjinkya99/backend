import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { DataSourceOptions, Repository } from 'typeorm';
import { createDatabase } from 'typeorm-extension';
import { DataSource } from "typeorm"
import { User } from '../../auth/entities/user.entity';
import { AuthService } from '../../auth/auth.service';
import { take } from 'rxjs';
import { Order } from '../orders/entities/order.entity';
import { ShopFruits } from '../shop/entities/shopFruits.entity';
import { ShopVegetables } from '../shop/entities/shopVegetables.entity';
import { Vendor } from './entities/vendor.entity';
import { VendorShops } from './entities/vendorShop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopService } from '../shop/shop.service';
import { Address } from '../../auth/entities/user-address.entity';

@Injectable()
export class VendorService {

  constructor(private readonly authService: AuthService,
    private readonly shopsService: ShopService,
    @InjectRepository(Vendor) private readonly vendor: Repository<Vendor>,
    @InjectRepository(Address) private readonly address: Repository<Address>,
    @InjectRepository(User) private readonly user: Repository<User>
  ) { }
  create(createVendorDto: CreateVendorDto) {
    return 'This action adds a new vendor';
  }

  async findAll() {
    const myData = await new Promise(resolve => {
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

  async createVendorDB(userBody) {
    const vendorId = await new Promise(async resolve => {

      const vendorId = await this.vendor.query(`SELECT FLOOR(RAND() * 99999) AS random_num
      FROM Vendor
      WHERE ("random_num" NOT IN (SELECT vendorId FROM Vendor))
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
        password: 'Ajinkya@123',
        database: "vendor_db_" + vendorBody.vendorId,
        synchronize: true,
        entities: [User, VendorShops, Order, ShopFruits, ShopVegetables, Address]
      };
      try {
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
        this.user.create(user); // this will run any hooks present, such as password hashing
        await userRepo.save(user);
        const savedUser = await this.user.save(user);

        if (userBody?.address) {

          const address = {
            userId: savedUser.id,
            title: userBody.address,
          }

          this.address.create(address);
          await this.address.save(address);
          await dataSource.destroy()
          resolve(vendorBody.vendorId)
        }
      } catch (Exception) {
        console.log(Exception)
      }

    })

    return vendorId
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
        if (object?.address) {

          const address = {
            userId: myQuery.id,
            title: object.address,
          }

          this.address.create(address);
          await this.address.save(address);

        }
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