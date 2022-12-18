import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';

@Module({
  controllers: [ShopController],
  providers: [ShopService],
  imports: [TypeOrmModule.forFeature([Shop])],
})
export class ShopModule {}
