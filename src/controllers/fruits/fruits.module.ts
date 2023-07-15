import { FruitImage } from './entities/FruitImages.entity';
import { FruitCategory } from './entities/FruitCategory.entity';
import { FruitMineral } from './entities/FruitMineral.entity';
import { FruitVitamin } from './entities/FruitVitamins.entity';
import { Module } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { FruitsController } from './fruits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './entities/Fruit.entity';
import { Mineral } from '../minerals/entities/mineral.entity';
import { Category } from '../categories/entities/category.entity';
import { Vitamin } from '../vitamins/entities/vitamin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fruit, FruitVitamin, FruitMineral,
      FruitCategory, FruitImage, Mineral, Category, Vitamin]),
  ],
  controllers: [FruitsController],
  providers: [FruitsService]
})
export class FruitsModule { }
