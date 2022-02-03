import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Benefit } from './benefit.model';
import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Note } from './note.model';
import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';


@Entity('mineral')
export class Mineral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  noteId: string;

  @Column()
  benefitId: string;

  @ManyToMany(() => Benefit, benefit => benefit.minerals, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'benefitId',
  })
  benefits: Benefit[];

  @ManyToMany(() => Note, note => note.minerals, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'noteId',
  })
  note: Note;

}