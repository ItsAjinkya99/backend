import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {

  constructor(@InjectRepository(Order) private readonly order: Repository<Order>) { }

  async create(createOrderDto: any) {
    const order = new Order();
    Object.assign(order, createOrderDto);

    this.order.create(order); // this will run any hooks present, such as password hashing
    const savedOrderDetails = await this.order.save(order);

    return savedOrderDetails;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
