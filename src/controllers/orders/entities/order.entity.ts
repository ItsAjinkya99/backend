import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Entity('order')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    shopId: string;
    
    @Column()
    customerId: string;

    @Column({type: "longtext"})
    orderData: string 

    @ManyToOne(() => User, user => user.orders, { eager: true })
    user: User;

}