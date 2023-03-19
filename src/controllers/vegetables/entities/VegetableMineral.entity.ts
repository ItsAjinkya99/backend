import { Vegetable } from 'src/controllers/vegetables/entities/Vegetable.entity';
import { Mineral } from 'src/controllers/minerals/entities/mineral.entity';
import { Fruit } from 'src/controllers/fruits/entities/Fruit.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('VegetableMineral')
export class VegetableMineral {
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