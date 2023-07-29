
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm";
import { Vegetable } from './Vegetable.entity';
import { Mineral } from '../../minerals/entities/mineral.entity';

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
    minerals: Relation<Mineral>;

    @ManyToOne(() => Vegetable, vegetable => vegetable.id, { eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'vegetableId',
    })
    vegetable: Relation<Vegetable>

}