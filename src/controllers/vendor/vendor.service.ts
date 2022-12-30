import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { DataSourceOptions } from 'typeorm';
import { createDatabase } from 'typeorm-extension';
import { DataSource } from "typeorm"
import { User } from 'src/auth/entities/user.entity';
import { Fruit } from '../fruits/entities/fruit.entity';
import { Shop } from '../shop/entities/shop.entity';

@Injectable()
export class VendorService {

  create(createVendorDto: CreateVendorDto) {
    return 'This action adds a new vendor';
  }

  findAll() {
    return `This action returns all vendor`;
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

}
