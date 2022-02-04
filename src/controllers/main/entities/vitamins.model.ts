import { Fruit_vitamin } from './../../fruits/entities/fruit_vitamins.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Benefit } from './benefit.model';
import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Note } from './note.model';
import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';


@Entity('vitamin')
export class Vitamin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  /* @Column()
  benefitsId: string;

  @Column()
  notesId: string; */

  @ManyToMany(() => Vegetable, (vegetable) => vegetable.vitamins)
  vegetables: Vegetable[];

  @OneToMany(() => Fruit_vitamin, fruit => fruit.vitamins)
  fruits: Fruit[];

  /* @ManyToOne(() => Benefit, benefit => benefit.id, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'benefitsId',
  })
  benefits: Benefit[];

  @ManyToOne(() => Note, note => note.minerals, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'notesId',
  })
  note: Note; */

}