import { Fruit } from './Fruit.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, Relation } from "typeorm";

@Entity('FruitImage')
export class FruitImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fruitId: number;

  @Column()
  imageName: string;

  @ManyToOne(() => Fruit, fruit => fruit.id, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'fruitId',
  })
  fruits: Relation<Fruit>;
}