import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { Shop } from '../shop/entities/shop.entity';
import { Vendor } from './entities/vendor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [VendorController],
  imports: [TypeOrmModule.forFeature([Shop, Vendor])
  
  ],
  providers: [VendorService]
})
export class VendorModule {
  
}
