import { BadRequestException, Injectable, Sse } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, DataSource, DataSourceOptions, Repository } from 'typeorm';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';
import { AuthService } from 'src/auth/auth.service';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../customer/entities/OrderCreated.event';
import { VendorShops } from '../vendor/entities/vendorShop.entity';
import { User } from 'src/auth/entities/user.entity';
import { Order } from '../orders/entities/order.entity';
import { ShopFruits } from './entities/shopFruits.entity';
import { ShopVegetables } from './entities/shopVegetables.entity';
import { Vegetable } from '../vegetables/entities/Vegetable.entity';
import { Fruit } from '../fruits/entities/Fruit.entity';

@Injectable()
export class ShopService {

  myOrders: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public myOrdersObservable = this.myOrders.asObservable();

  allShops: any[] = [];
  constructor(private authService: AuthService,
    @InjectRepository(Shop) private shop: Repository<Shop>,
    @InjectRepository(Vegetable) private vegetable: Repository<Vegetable>,
    @InjectRepository(Fruit) private fruit: Repository<Fruit>,
  ) { }

  async create(createShopDto: any) {

    /*Check if the user is already present in database, if yes, throw error */
    const checkShop = await this.shop.findOne({ where: { name: createShopDto.name } });

    if (checkShop) {

      throw new BadRequestException('Please enter different name');
    } else {
      try {
        const shop = new Shop();

        Object.assign(shop, createShopDto);

        this.shop.create(shop); // this will run any hooks present, such as password hashing
        await this.shop.save(shop);

        return shop;
      } catch (error) {
        console.log(error)
      }

    }
  }

  async findVendorShops() {

    let myData = await new Promise(resolve => {
      this.authService.getDataSource().pipe(take(1)).subscribe(async (data) => {
        const VendorShops1 = data.getRepository(VendorShops);
        const myQuery = await VendorShops1.find();
        this.allShops = myQuery
        resolve(this.allShops);
      })
    })

    return myData;

  }

  async findAll() {
    return await this.shop.find();
  }

  async getShopItems(id: number, vendorId: number) {

    const data = await this.authService.getVendorDB(vendorId)

    const sfRepo = data.getRepository(ShopFruits)
    const shopFruits = await sfRepo.createQueryBuilder('fruits')
      .addSelect('fruits.fruitId')
      .where('fruits.shopId = :shopId', { shopId: id }).getMany();

    const svRepo = data.getRepository(ShopVegetables)
    const shopVegetables = await svRepo.createQueryBuilder('vegetables')
      .addSelect('vegetables.vegetableId')
      .where('vegetables.shopId = :shopId', { shopId: id }).getMany();

    const fruits = await this.fruit.find()
    const vegetables = await this.vegetable.find()

    shopFruits.forEach((fruit) => {
      fruits.forEach((fruit1) => {
        if (fruit.fruitId == fruit1.id) {
          fruit['name'] = fruit1.name
          fruit['image'] = fruit1.mainImage
          return
        }
      })
      return
    })

    shopVegetables.forEach((vegetable) => {
      vegetables.forEach((vegetable1) => {
        if (vegetable.vegetableId == vegetable1.id) {
          vegetable['name'] = vegetable1.name
          vegetable['image'] = vegetable1.mainImage
          return
        }
      })
      return
    })

    const shopItems = [shopFruits, shopVegetables]
    return shopItems
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }

  setDataSource(shops) {
    this.myOrders.next(shops);
  }

  async createShopItems(shopData: any) {

    const myData = await new Promise(resolve => {
      this.authService.getDataSource().pipe(take(1)).subscribe(async (data) => {

        // get shop specific repos
        const svRepo = data.getRepository(ShopVegetables)
        const sfRepo = data.getRepository(ShopFruits)

        // loop through incoming data
        if (shopData['vegetables']) {
          shopData['vegetables'].forEach(async element => {

            let vegetable = await svRepo.createQueryBuilder('shop')
              .addSelect('shop.shopId')
              .where('shop.shopId = :shopId', { shopId: shopData['shopId'] })
              .andWhere('shop.vegetableId = :vegetableId', { vegetableId: element }).getOne();

            if (vegetable) {
              return
            }
            const veg1 = new ShopVegetables()
            var myObj = {
              shopId: shopData['shopId'],
              vegetableId: element
            }

            Object.assign(veg1, myObj)
            try {
              console.log("reaching here")
              svRepo.create(veg1)
              await svRepo.save(veg1);

            } catch (Exception) {
              console.log(Exception)
            }

          });
        }

        if (shopData['fruits']) {
          shopData['fruits'].forEach(async element => {

            let fruit = await sfRepo.createQueryBuilder('shop')
              .addSelect('shop.shopId')
              .where('shop.shopId = :shopId', { shopId: shopData['shopId'] })
              .andWhere('shop.fruitId = :fruitId', { fruitId: element }).getOne()

            if (fruit) {
              return;
            }

            const fruit1 = new ShopFruits()
            let myObj = {
              shopId: shopData['shopId'],
              fruitId: element
            }
            Object.assign(fruit1, myObj)

            sfRepo.create(fruit1)
            await sfRepo.save(fruit1);
          });
        }

        resolve(true);
      })

    })

    return myData;
  }

}
