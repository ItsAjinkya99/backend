import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/controllers/categories/entities/category.entity';
import { Mineral } from 'src/controllers/minerals/entities/mineral.entity';
import { Vitamin } from 'src/controllers/vitamins/entities/vitamin.entity';

@Entity('vegetable')
export class Vegetable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  mainImage: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdOn: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  modifiedOn: Date;

}