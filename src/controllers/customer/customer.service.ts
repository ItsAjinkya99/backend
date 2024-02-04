import { BadRequestException, Injectable } from '@nestjs/common';
import { Order } from '../orders/entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BehaviorSubject } from 'rxjs';
import { Address } from '../../auth/entities/user-address.entity';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class CustomerService {

  myShopId: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public myShopIdObservable = this.myShopId.asObservable();
  shopId: number
  shops: any[]

  constructor(@InjectRepository(Order) private readonly order: Repository<Order>,
    @InjectRepository(Address) private readonly address: Repository<Address>,
    private readonly ordersService: OrdersService
  ) { }

  async getAddresses(id: number) {
    try {
      const addresses = await this.address.find({ where: { customerId: (id) } });
      return addresses;
    } catch (err) {
      throw new BadRequestException('No address(es) found');
    }
  }

  async getOrders(id: number) {
    try {
      const orders = await this.order.find({ where: { customerId: (id) } });

      return orders;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async createAddress(addressBody: any) {
    try {
      console.log(addressBody)
      const address = new Address();
      Object.assign(address, addressBody);
      this.address.create(address);
      await this.address.save(address);
      return address
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async placeOrder(orderBody: object) {
    return this.ordersService.create(orderBody);
  }

  setShopId(id: number) {
    this.myShopId.next(id);
    this.shopId = id;
  }

}