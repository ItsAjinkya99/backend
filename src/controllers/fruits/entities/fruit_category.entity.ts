import { Category } from "src/controllers/categories/entities/category.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('Fruit_Category')
export class Fruit_Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  categoriesId: string;

  @ManyToOne(() => Category, category => category.id, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'categoriesId',
  })
  categories: Category[];
}