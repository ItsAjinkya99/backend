import { vegetableImage } from './entities/vegetableImages.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { Note } from '../note/entities/note.entity';
import { forwardRef, Module } from '@nestjs/common';
import { VegetablesService } from './vegetables.service';
import { VegetablesController } from './vegetables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainModule } from '../main/main.module';
import { Category } from '../categories/entities/category.entity';
import { vegetableMineral } from './entities/vegetableMineral.entity';
import { Mineral } from '../minerals/entities/mineral.entity';
import { Vitamin } from '../vitamins/entities/vitamin.entity';
import { vegetableVitamin } from './entities/vegetableVitamin.entity';
import { vegetableCategory } from './entities/vegetableCategory.entity';

@Module({
  imports: [forwardRef(() => MainModule),
  TypeOrmModule.forFeature([vegetableVitamin, vegetableMineral, vegetableCategory, Mineral, Category, Vitamin, Vegetable, vegetableImage]),],
  controllers: [VegetablesController],
  providers: [VegetablesService]
})
export class VegetablesModule { }
