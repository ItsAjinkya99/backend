import { Injectable, Session } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Order } from '../orders/entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from './entities/OrderCreated.event';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class CustomerService {
  private events = new Subject();

  myShopId: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public myShopIdObservable = this.myShopId.asObservable();
  shopId: number

  constructor(@InjectRepository(Order) private readonly order: Repository<Order>,
    private eventEmitter: EventEmitter2) { }

  create(createCustomerDto: CreateCustomerDto,
  ) {
    return 'This action adds a new customer';
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }

  async placeOrder(orderBody: object) {
    /* const order = new Order();

    Object.assign(order, orderBody);

    this.order.create(order);
    await this.order.save(order); */
    this.sendPlaceOrder()
  }

  setShopId(id: number) {
    console.log("settings shop is" + id);
    this.myShopId.next(id);
    this.shopId = id;
  }

  sendPlaceOrder() {
    const orderCreatedEvent = new OrderCreatedEvent()

    orderCreatedEvent.name = "order.name";
    orderCreatedEvent.description = "order.description";
    orderCreatedEvent.shopId = 2;

    this.eventEmitter.emit('order.created', orderCreatedEvent);

  }
}