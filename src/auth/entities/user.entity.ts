import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "../user-roles";
import * as bcrypt from 'bcryptjs';

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

    @BeforeInsert()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password,10)
    }

}