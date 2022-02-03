import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Benefit } from './benefit.model';
import { Note } from './note.model';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';
import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Vegetable, (vegetable) => vegetable.vitamins)
  vegetables: Vegetable[];

  @ManyToMany(() => Fruit, fruit => fruit.vitamins)
  fruits: Fruit[];
}