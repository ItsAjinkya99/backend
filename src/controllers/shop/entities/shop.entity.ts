import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity('Shops')
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  address: string;

  @Column()
  cover: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  status: string;

  @Column()
  userId: number

  @Column()
  vendorId: number

  @Column()
  OpenTime: string;

  @Column()
  CloseTime: string;

  @Column()
  totalRating: number

  @Column({ default: 0 })
  latitude: number;

  @Column({ default: 0 })
  longitude: number

  @Column()
  description: string;

  @OneToMany(() => Order, order => order.shopId)
  @JoinTable()
  orders: Relation<Order[]>;

}