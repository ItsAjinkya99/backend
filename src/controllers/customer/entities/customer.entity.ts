import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from 'src/controllers/orders/entities/order.entity';
import * as bcrypt from 'bcryptjs';
import { UserRoles } from 'src/auth/user-roles';
import { User } from 'src/auth/entities/user.entity';

@Entity('customers')
export class Customer extends User {

  @Column({ nullable: false })
  billingAddress: string;

  @Column({ nullable: false })
  shippingAddress: string;

  @OneToMany(() => Order, order => order.customer)
  orders: Order[];

}