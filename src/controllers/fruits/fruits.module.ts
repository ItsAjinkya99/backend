import { VitaminsModule } from './../vitamins/vitamins.module';
import { fruitImage } from 'src/controllers/fruits/entities/fruitImages.entity';
import { fruitCategory } from './entities/fruitCategory.entity';
import { fruitMineral } from './entities/fruitMineral.entity';
import { fruitVitamin } from './entities/fruitVitamins.entity';
import { forwardRef, Module } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { FruitsController } from './fruits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './entities/fruit.entity';
import { Mineral } from '../minerals/entities/mineral.entity';
import { Category } from '../categories/entities/category.entity';
import { Vitamin } from '../vitamins/entities/vitamin.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([Fruit, fruitVitamin, fruitMineral,
    fruitCategory, fruitImage, Mineral, Category, Vitamin]),],
  controllers: [FruitsController],
  providers: [FruitsService]
})
export class FruitsModule { }
