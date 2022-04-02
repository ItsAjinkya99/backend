import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Vitamin } from 'src/controllers/vitamins/entities/vitamin.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('fruitVitamin')
export class fruitVitamin {
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
  vitamins: Vitamin;

  @ManyToOne(() => Fruit, fruit => fruit.id, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'fruitId',
  })
  fruit: Fruit

}