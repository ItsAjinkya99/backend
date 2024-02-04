import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { User } from '../../../auth/entities/user.entity';
import { Shop } from '../../shop/entities/shop.entity';

@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    shopId: number;

    @Column()
    vendorId: number;

    @Column()
    customerId: number;

    @Column()
    addressId: number;

    @Column({ type: "json" })
    order: string[]

    @Column()
    total: number;

    @Column()
    grandTotal: number;

    @Column()
    deliveryCharge: number;

    @Column()
    status: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    time: Date;

    @Column()
    paid: string;

    @Column({ type: "longtext" })
    instructions: string

    @ManyToOne(() => User, user => user.orders, { eager: true })
    customer: Relation<User>;

    /* @ManyToOne(() => Shop, shop => shop.id, { eager: true })
    shop: Relation<Shop>; */

}