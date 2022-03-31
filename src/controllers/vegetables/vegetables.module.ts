import { Note } from '../note/entities/note.entity';
import { forwardRef, Module } from '@nestjs/common';
import { VegetablesService } from './vegetables.service';
import { VegetablesController } from './vegetables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainModule } from '../main/main.module';
import { Category } from '../categories/entities/category.entity';
import { Vegetable_mineral } from './entities/vegetable_mineral.entity';
import { Mineral } from '../minerals/entities/mineral.entity';
import { Vitamin } from '../vitamins/entities/vitamin.entity';
import { Vegetable_vitamin } from './entities/vegetable_vitamin.entity';
import { Vegetable_Category } from './entities/vegetable_category.entity';

@Module({
  imports: [forwardRef(() => MainModule),
  TypeOrmModule.forFeature([Vegetable_vitamin, Vegetable_mineral, Vegetable_Category, Mineral, Category, Vitamin]),],
  controllers: [VegetablesController],
  providers: [VegetablesService]
})
export class VegetablesModule { }
