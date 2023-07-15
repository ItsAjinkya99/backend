import { Vegetable } from '../../vegetables/entities/Vegetable.entity';
import { Fruit } from 'src/controllers/fruits/entities/Fruit.entity';
import { Vitamin } from '../../vitamins/entities/vitamin.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('VegetableVitamin')
export class VegetableVitamin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    vegetableId: number;

    @Column()
    vitaminsId: number;

    @ManyToOne(() => Vitamin, vitamin => vitamin.id, { eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'vitaminsId',
    })
    vitamins: Vitamin;

    @ManyToOne(() => Vegetable, vegetable => vegetable.id, { eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'vegetableId',
    })
    vegetable: Vegetable

}