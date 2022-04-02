import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity('vegetableImage')
export class vegetableImage {
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