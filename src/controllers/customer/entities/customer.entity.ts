import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from 'src/controllers/orders/entities/order.entity';
import * as bcrypt from 'bcryptjs';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  billingAddress: string;

  @Column({ nullable: false })
  shippingAddress: string;
  
  @Column({ default: null })
  profilePic: string;

  @OneToMany(() => Order, order => order.customer)
  orders: Order[];

  @BeforeInsert()
  hashPassword(){
    this.password = bcrypt.hashSync(this.password, 10)
  }
 
}