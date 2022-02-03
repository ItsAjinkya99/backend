import { Category } from "src/controllers/main/entities/categories.model";
import { Mineral } from "src/controllers/main/entities/minerals.model";
import { Vitamin } from "src/controllers/main/entities/vitamins.model";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('Fruit_Category')
export class Fruit_Category{
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