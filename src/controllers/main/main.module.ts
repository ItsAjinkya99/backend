import { CustomerModule } from './../customer/customer.module';
import { forwardRef, Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainService } from './main.service';

import { Customer } from '../customer/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
  ],
  controllers: [MainController],
  providers: [MainService]
})
export class MainModule { }