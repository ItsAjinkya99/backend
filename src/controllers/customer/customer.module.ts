import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { format } = require('winston');
const { combine, timestamp, label, printf } = format;

@Module({
  imports: [
    TypeOrmModule.forFeature([Vegetable, Order])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule { }

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({ filename: `log/customer/customer-%DATE%.log` }),
  ],
  format: combine(
    label({ label: 'backend' }),
    timestamp(),
    myFormat
  ),

});