import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from 'src/controllers/main/entities/orders.model';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  billing_address: string;

  @Column({ nullable: false })
  shipping_address: string;

  @OneToMany(() => Order, order => order.customer)
  order: Order[]; 
  /* @OneToMany(() => Order, order => order.customer)
  shops: Order[];
  /* @OneToMany(() => Post, (post) => post.category)
  posts: Post[]; */
}