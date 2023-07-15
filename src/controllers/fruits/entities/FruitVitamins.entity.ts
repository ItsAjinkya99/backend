import { Fruit } from '../../fruits/entities/Fruit.entity';
import { Vitamin } from '../../vitamins/entities/vitamin.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm";

@Entity('FruitVitamin')
export class FruitVitamin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fruitId: number;

  @Column()
  vitaminsId: number;

  @ManyToOne(() => Vitamin, vitamin => vitamin.id, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'vitaminsId',
  })
  vitamins: Relation<Vitamin>;

  @ManyToOne(() => Fruit, fruit => fruit.id, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'fruitId',
  })
  fruit: Relation<Fruit>

}