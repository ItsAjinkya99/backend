import { VitaminsModule } from './../vitamins/vitamins.module';
import { Fruit_Image } from 'src/controllers/fruits/entities/fruit_images.entity';
import { Fruit_Category } from './entities/fruit_category.entity';
import { Fruit_Mineral } from './entities/fruit_mineral.entity';
import { Fruit_vitamin } from './entities/fruit_vitamins.entity';
import { MainModule } from './../main/main.module';
import { forwardRef, Module } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { FruitsController } from './fruits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './entities/fruit.entity';
import { Mineral } from '../minerals/entities/mineral.entity';
import { Category } from '../categories/entities/category.entity';
import { Vitamin } from '../vitamins/entities/vitamin.entity';

@Module({
  imports: [forwardRef(() => MainModule),
  TypeOrmModule.forFeature([Fruit, Fruit_vitamin, Fruit_Mineral,
    Fruit_Category, Fruit_Image, Mineral, Category, Vitamin]),],
  controllers: [FruitsController],
  providers: [FruitsService]
})
export class FruitsModule { }
