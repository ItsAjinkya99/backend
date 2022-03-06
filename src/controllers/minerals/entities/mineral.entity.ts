import { Fruit_Mineral } from './../../fruits/entities/fruit_mineral.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';


@Entity('mineral')
export class Mineral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Fruit_Mineral, fruit => fruit.minerals)
  fruits: Fruit[];


}