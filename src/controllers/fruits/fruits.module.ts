import { VitaminsModule } from './../vitamins/vitamins.module';
import { FruitImage } from 'src/controllers/fruits/entities/FruitImages.entity';
import { FruitCategory } from './entities/FruitCategory.entity';
import { FruitMineral } from './entities/FruitMineral.entity';
import { FruitVitamin } from './entities/FruitVitamins.entity';
import { forwardRef, Module } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { FruitsController } from './fruits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './entities/Fruit.entity';
import { Mineral } from '../minerals/entities/mineral.entity';
import { Category } from '../categories/entities/category.entity';
import { Vitamin } from '../vitamins/entities/vitamin.entity';
import { AccessControlModule } from 'nest-access-control';
import { roles } from 'src/auth/user-roles';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fruit, FruitVitamin, FruitMineral,
      FruitCategory, FruitImage, Mineral, Category, Vitamin]),
  ],
  controllers: [FruitsController],
  providers: [FruitsService]
})
export class FruitsModule { }
