import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Vegetable } from "./Vegetable.entity";

@Entity('VegetableImage')
export class VegetableImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    vegetableId: number;

    @Column()
    imageName: string;

    @ManyToOne(() => Vegetable, vegetable => vegetable.id, { eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'vegetableId',
    })
    vegetable: Vegetable;
}