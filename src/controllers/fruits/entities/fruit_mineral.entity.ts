import { Category } from "src/controllers/main/entities/categories.model";
import { Mineral } from "src/controllers/main/entities/minerals.model";
import { Vitamin } from "src/controllers/main/entities/vitamins.model";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('Fruit_Mineral')
export class Fruit_Mineral{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    mineralsId: string;
  
    @ManyToOne(() => Mineral, mineral => mineral.id, { eager: true })
    @JoinColumn({
      referencedColumnName: 'id',
      name: 'mineralsId',
    })
    minerals: Mineral;
  }