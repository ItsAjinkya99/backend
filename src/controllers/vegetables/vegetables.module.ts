import { vegetableImage } from './entities/VegetableImages.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/Vegetable.entity';
import { Note } from '../note/entities/note.entity';
import { forwardRef, Module } from '@nestjs/common';
import { VegetablesService } from './vegetables.service';
import { VegetablesController } from './vegetables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { VegetableMineral } from './entities/VegetableMineral.entity';
import { Mineral } from '../minerals/entities/mineral.entity';
import { Vitamin } from '../vitamins/entities/vitamin.entity';
import { VegetableVitamin } from './entities/VegetableVitamin.entity';
import { vegetableCategory } from './entities/VegetableCategory.entity';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VegetableVitamin,
      VegetableMineral,
      vegetableCategory,
      Mineral,
      Category,
      Vitamin,
      Vegetable,
      vegetableImage]),
    MulterModule.register({
      dest: './upload/vegetables',
    })],
  controllers: [VegetablesController],
  providers: [VegetablesService]
})
export class VegetablesModule { }
