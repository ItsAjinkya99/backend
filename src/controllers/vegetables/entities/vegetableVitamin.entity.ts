import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Vitamin } from 'src/controllers/vitamins/entities/vitamin.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('vegetableVitamin')
export class vegetableVitamin {
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