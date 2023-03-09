import { BadRequestException, Injectable, Sse } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions, Repository } from 'typeorm';
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

@Injectable()
export class ShopService {

  myOrders: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public myOrdersObservable = this.myOrders.asObservable();

  allShops: any[] = [];
  constructor(private authService: AuthService,
    @InjectRepository(Shop) private shop: Repository<Shop>) { }

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

  async findAllShops() {
    return await this.shop.find();
  }

  async findOne(id) {

    const myData = await new Promise(resolve => {
      this.authService.getDataSource().pipe(take(1)).subscribe(async (data) => {
        const sfRepo = data.getRepository(ShopFruits)
        const shopFruits = await sfRepo.find({ where: { shopId: id } });

        const svRepo = data.getRepository(ShopVegetables)
        const shopVegetables = await svRepo.find({ where: { shopId: id } });

        const shopItems = [shopFruits, shopVegetables]

        // console.log(shopItems)
        resolve(shopItems);
      })
    })

    return myData
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

}
