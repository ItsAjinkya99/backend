import { FruitVitamin } from '../../fruits/entities/FruitVitamins.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Fruit } from '../../fruits/entities/Fruit.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/Vegetable.entity';
import { Exclude } from 'class-transformer';

@Entity('Vitamin')
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

  @OneToMany(() => FruitVitamin, fruit => fruit.vitamins)
  fruits: Relation<Fruit[]>;

}