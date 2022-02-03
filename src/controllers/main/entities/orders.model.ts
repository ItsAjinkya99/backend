import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from 'src/controllers/customer/entities/customer.entity';
import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: string;

  @ManyToOne(() => Customer, customer => customer.order, { eager: true })
  customer: Customer;

}