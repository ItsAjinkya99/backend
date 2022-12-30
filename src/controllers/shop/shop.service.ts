import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';
import { AuthService } from 'src/auth/auth.service';
import { BehaviorSubject, Subject, take } from 'rxjs';

@Injectable()
export class ShopService {

  myShops: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public myShopsObservable = this.myShops.asObservable();
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

  async findAll() {

    let myData = await new Promise(resolve => {
      this.authService.getDataSource().pipe(take(1)).subscribe(async (data) => {
        const vendorShops = data.getRepository(Shop);
        const myQuery = await vendorShops.find();
        this.allShops = myQuery
        resolve(this.allShops);
      })
    })

    return myData;

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
}
