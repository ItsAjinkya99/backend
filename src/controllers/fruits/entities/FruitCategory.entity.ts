import { Category } from "../../categories/entities/category.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm";

@Entity('FruitCategory')
export class FruitCategory {
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
  categories: Relation<Category[]>;
}