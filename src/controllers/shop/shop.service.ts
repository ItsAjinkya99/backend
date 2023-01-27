import { BadRequestException, Injectable, Sse } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';
import { AuthService } from 'src/auth/auth.service';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../customer/entities/OrderCreated.event';
import { vendorShops } from '../vendor/entities/vendorShop.entity';

@Injectable()
export class ShopService {

  myOrders: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public myOrdersObservable = this.myOrders.asObservable();

  allShops: any[] = [];
  constructor(private authService: AuthService,
    @InjectRepository(Shop) private shop: Repository<Shop>) { }

  async create(createShopDto: CreateShopDto) {

    /*Check if the user is already present in database, if yes, throw error */
    const checkShop = await this.shop.findOne({ where: { name: createShopDto.name } });

    if (checkShop) {

      throw new BadRequestException('Please enter different name');
    } else {
      const shop = new Shop();

      Object.assign(shop, createShopDto);

      this.shop.create(shop); // this will run any hooks present, such as password hashing
      await this.shop.save(shop);

      return shop;
    }
  }

  async findVendorShops() {

    let myData = await new Promise(resolve => {
      this.authService.getDataSource().pipe(take(1)).subscribe(async (data) => {
        const vendorShops1 = data.getRepository(vendorShops);
        const myQuery = await vendorShops1.find();
        this.allShops = myQuery
        resolve(this.allShops);
      })
    })

    return myData;

  }

  async findAllShops() {
    return this.shop.find();
  }

  findOne(id: number) {
    return this.shop.findOne({ where: { id } });
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
