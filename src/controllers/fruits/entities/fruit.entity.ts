import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/controllers/main/entities/categories.model';
import { Mineral } from 'src/controllers/main/entities/minerals.model';
import { Vitamin } from 'src/controllers/main/entities/vitamins.model';

@Entity('fruit')
export class Fruit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdOn: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  modifiedOn: Date;

}