import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { User } from '../../../auth/entities/user.entity';

@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    shopId: string;

    @Column()
    customerId: string;

    @Column({ type: "longtext" })
    orderData: string

    @ManyToOne(() => User, user => user.orders, { eager: true })
    user: Relation<User>;

}