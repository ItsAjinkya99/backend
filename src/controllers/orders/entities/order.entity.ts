import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from 'src/controllers/customer/entities/customer.entity';

@Entity('order')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: string;

    @ManyToOne(() => Customer, customer => customer.order, { eager: true })
    customer: Customer;

}