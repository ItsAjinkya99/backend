import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '../orders/entities/order.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
  TypeOrmModule.forFeature([Vegetable, Order]),
  forwardRef(() => AuthModule)],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule { }