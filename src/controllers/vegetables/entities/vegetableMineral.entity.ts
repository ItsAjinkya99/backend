import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { Mineral } from 'src/controllers/minerals/entities/mineral.entity';
import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('vegetableMineral')
export class vegetableMineral {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    vegetableId: number;

    @Column()
    mineralsId: number;

    @ManyToOne(() => Mineral, mineral => mineral.id, { eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'mineralsId',
    })
    minerals: Mineral;

    @ManyToOne(() => Vegetable, vegetable => vegetable.id, { eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'vegetableId',
    })
    vegetable: Vegetable

}