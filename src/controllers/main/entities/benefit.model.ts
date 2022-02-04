import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Mineral } from './minerals.model';
import { Vitamin } from './vitamins.model';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';

// import {Vendor}
// import {vendor}
@Entity('benefit')
export class Benefit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /* @OneToMany(() => Mineral, mineral => mineral.benefits)
  minerals: Mineral[];

  @OneToMany(() => Vitamin, vitamin => vitamin.benefits)
  vitamins: Vitamin[]; */

}