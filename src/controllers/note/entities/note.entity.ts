import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';

@Entity('note')
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    /* @OneToMany(() => Mineral, mineral => mineral.benefits)
    minerals: Mineral[];
  
    @OneToMany(() => Vitamin, vitamin => vitamin.benefits)
    vitamins: Vitamin[]; */

}