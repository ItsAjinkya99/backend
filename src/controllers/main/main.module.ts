import { CustomerModule } from './../customer/customer.module';
import { forwardRef, Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainService } from './main.service';
import { Benefit } from './entities/benefit.model';
import { Category } from './entities/categories.model';
import { Color } from './entities/color.model';
import { Mineral } from './entities/minerals.model';
import { Note } from './entities/note.model';
import { Order } from './entities/orders.model';
import { Vitamin } from './entities/vitamins.model';
import { Customer } from '../customer/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Customer, Mineral, Note,
      Benefit, Order, Color]),
  ],
  controllers: [MainController],
  providers: [MainService]
})
export class MainModule { }