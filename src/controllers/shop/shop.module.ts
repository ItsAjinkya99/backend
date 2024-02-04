import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Order } from '../orders/entities/order.entity';
import { VendorService } from '../vendor/vendor.service';
import { Vendor } from '../vendor/entities/vendor.entity';
import { Vegetable } from '../vegetables/entities/Vegetable.entity';
import { Fruit } from '../fruits/entities/Fruit.entity';
import { Address } from '../../auth/entities/user-address.entity';
import { User } from '../../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, Order, Vendor, Vegetable, Fruit, Address, User])],
  controllers: [ShopController],
  providers: [ShopService, VendorService],
})
export class ShopModule { }
