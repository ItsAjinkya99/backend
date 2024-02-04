import { Vegetable } from '../vegetables/entities/Vegetable.entity';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { Address } from '../../auth/entities/user-address.entity';
import { OrdersModule } from '../orders/orders.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Vegetable, Order, Address]), OrdersModule,],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule { }
