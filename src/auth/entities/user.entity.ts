import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "../user-roles";
import * as bcrypt from 'bcryptjs';
import { Shop } from "src/controllers/shop/entities/shop.entity";
import { Order } from "src/controllers/orders/entities/order.entity";

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ select: false })
    password: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    email: string;

    @Column({ type: 'enum', enum: UserRoles, enumName: 'roles', default: UserRoles.Customer })
    role: UserRoles;

    @Column({ default: null })
    profilePic: string;

    @Column({ default: 0 })
    deleted: boolean

    /* @OneToMany(() => Shop, shop => shop.user)
    shops: Shop[]; */

    @OneToMany(() => Order, order => order.user)
    orders: Order[];

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10)
    }

}