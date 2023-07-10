import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { Shop } from '../shop/entities/shop.entity';
// import { Vendor } from './entities/vendor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorShops } from './entities/vendorShop.entity';
import { User } from 'src/auth/entities/user.entity';
import { Vendor } from './entities/vendor.entity';
import { ShopService } from '../shop/shop.service';
import { ShopVegetables } from '../shop/entities/shopVegetables.entity';
import { ShopFruits } from '../shop/entities/shopFruits.entity';
import { Vegetable } from '../vegetables/entities/Vegetable.entity';
import { Fruit } from '../fruits/entities/Fruit.entity';

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { format } = require('winston');
const { combine, timestamp, label, printf } = format;

@Module({
  controllers: [VendorController],
  imports: [TypeOrmModule.forFeature([User, Shop, Vendor, Vegetable, Fruit])
  ],
  providers: [VendorService, ShopService]
})
export class VendorModule { }
