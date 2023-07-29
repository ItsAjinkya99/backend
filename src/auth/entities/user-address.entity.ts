import { Entity, PrimaryGeneratedColumn, Column, Relation, ManyToOne, JoinColumn } from "typeorm";

@Entity('Address')
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    title: string;

    @Column({ default: null })
    address: string;

    @Column({ default: null })
    landmark: string;

    @Column({ default: null })
    house: string;

    @Column({ default: 0 })
    latitude: number;

    @Column({ default: 0 })
    longitude: number

}