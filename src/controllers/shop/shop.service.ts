import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopService {

  constructor(@InjectRepository(Shop) private readonly shop: Repository<Shop>) { }

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
    const myQuery = this.shop.find();

    return await myQuery;
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
