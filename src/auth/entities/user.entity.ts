import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { UserRoles } from "../user-roles";
import * as bcrypt from 'bcryptjs';
import { Order } from "../../controllers/orders/entities/order.entity";
import { IsOptional } from "class-validator";

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
    email: string;

    @Column({ type: 'enum', enum: UserRoles, enumName: 'roles', default: UserRoles.Customer })
    role: UserRoles;

    @Column({ default: null })
    profilePic: string;

    @Column({ default: 0 })
    deleted: boolean

    @Column({ default: null })
    @IsOptional()
    vendorId?: boolean

    @OneToMany(() => Order, order => order.customer)
    orders: Relation<Order[]>;

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10)
    }

}