import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Category } from "src/controllers/main/entities/categories.model";
import { Mineral } from "src/controllers/main/entities/minerals.model";
import { Vitamin } from "src/controllers/main/entities/vitamins.model";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity('Fruit_Image')
export class Fruit_Image{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    fruitId: string;
  
    @Column()
    imageName: string;
  
    @OneToMany(() => Fruit, fruit => fruit.id, { eager: true })
    @JoinColumn({
      referencedColumnName: 'id',
      name: 'fruitId',
    })
    fruits: Fruit[];
  }