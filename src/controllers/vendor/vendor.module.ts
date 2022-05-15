import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { Shop } from '../shop/entities/shop.entity';
import { Vendor } from './entities/vendor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { vendorShop } from './entities/vendorShop.entity';

@Module({
  controllers: [VendorController],
  imports: [TypeOrmModule.forFeature([Shop, Vendor, vendorShop])

  ],
  providers: [VendorService]
})
export class VendorModule {

}
