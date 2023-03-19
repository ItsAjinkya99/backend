import { Fruit } from 'src/controllers/fruits/entities/Fruit.entity';
import { Mineral } from 'src/controllers/minerals/entities/mineral.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

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
  minerals: Mineral;

  @ManyToOne(() => Fruit, fruit => fruit.id, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'fruitId',
  })
  fruit: Fruit

}