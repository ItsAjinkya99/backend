import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainModule } from '../main/main.module';
import { Order } from '../main/entities/orders.model';

@Module({
  imports: [forwardRef(() => MainModule),
    TypeOrmModule.forFeature([Vegetable, Order])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}