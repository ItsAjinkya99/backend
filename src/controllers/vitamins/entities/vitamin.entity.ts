import { fruitVitamin } from '../../fruits/entities/fruitVitamins.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/Vegetable.entity';
import { Exclude } from 'class-transformer';


@Entity('vitamins')
export class Vitamin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: 0 })
  @Exclude()
  deleted: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdOn: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  modifiedOn: Date;

  @OneToMany(() => fruitVitamin, fruit => fruit.vitamins)
  fruits: Fruit[];

}