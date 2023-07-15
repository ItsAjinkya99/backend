import { Vegetable } from '../vegetables/entities/Vegetable.entity';
import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { AuthModule } from 'src/auth/auth.module';
// import { AuthService } from '../../auth/auth.service';

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { format } = require('winston');
const { combine, timestamp, label, printf } = format;

@Module({
  imports: [
    TypeOrmModule.forFeature([Vegetable, Order])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule { }
