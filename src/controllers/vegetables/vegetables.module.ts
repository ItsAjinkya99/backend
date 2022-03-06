import { Note } from '../note/entities/note.entity';
import { forwardRef, Module } from '@nestjs/common';
import { VegetablesService } from './vegetables.service';
import { VegetablesController } from './vegetables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainModule } from '../main/main.module';

@Module({
  imports: [forwardRef(() => MainModule),
  TypeOrmModule.forFeature([Note])],
  controllers: [VegetablesController],
  providers: [VegetablesService]
})
export class VegetablesModule { }
