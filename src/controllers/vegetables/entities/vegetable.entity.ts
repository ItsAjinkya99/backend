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

  @Column()
  vitaminsId: string;

  @Column()
  mineralsId: string;

  @Column()
  categoriesId: string;

  @ManyToMany(() => Vitamin, (vitamin) => vitamin.id, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'vitaminsId',
  })
  vitamins: Vitamin[];

  @ManyToMany(() => Mineral, (mineral) => mineral.id, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'mineralsId',
  })
  minerals: Mineral[];

  @ManyToMany(() => Category, (category) => category.id, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'categoriesId',
  })
  categories: Category[];


}