import { Category } from "src/controllers/main/entities/categories.model";
import { Mineral } from "src/controllers/main/entities/minerals.model";
import { Vitamin } from "src/controllers/main/entities/vitamins.model";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('Fruit_Vitamin')
export class Fruit_vitamin {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    vitaminsId: string;
  
    @ManyToOne(() => Vitamin, vitamin => vitamin.id, { eager: true })
    @JoinColumn({
      referencedColumnName: 'id',
      name: 'vitaminsId',
    })
    vitamins: Vitamin;
  }