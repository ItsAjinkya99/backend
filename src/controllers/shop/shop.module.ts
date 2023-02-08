import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { CustomerModule } from '../customer/customer.module';
import { CustomerService } from '../customer/customer.service';
import { Order } from '../orders/entities/order.entity';
import { VendorService } from '../vendor/vendor.service';
import { VendorModule } from '../vendor/vendor.module';
import { Vendor } from '../vendor/entities/vendor.entity';
import { VendorShops } from '../vendor/entities/vendorShop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, Order, Vendor]), CustomerModule],
  controllers: [ShopController],
  providers: [ShopService, CustomerService, VendorService],
})
export class ShopModule { }
