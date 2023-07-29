import { Fruit } from '../../../controllers/fruits/entities/Fruit.entity';
import { Mineral } from '../entities/mineral.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('FruitVitamin')
export class FruitVitamin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fruitId: number;

    @Column()
    mineralsId: number;

    @ManyToOne(() => Mineral, mineral => mineral.id, { eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'mineralsId',
    })
    vitamins: Mineral;

    @ManyToOne(() => Fruit, fruit => fruit.id, { eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'fruitId',
    })
    fruit: Fruit

}