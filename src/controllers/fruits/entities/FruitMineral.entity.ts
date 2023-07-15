import { Fruit } from './Fruit.entity';
import { Mineral } from '../../minerals/entities/mineral.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm";

@Entity('FruitMineral')
export class FruitMineral {
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
  minerals: Relation<Mineral>;

  @ManyToOne(() => Fruit, fruit => fruit.id, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'fruitId',
  })
  fruit: Relation<Fruit>

}