import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity('Fruit_Image')
export class Fruit_Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fruitId: number;

  @Column()
  imageName: string;

  @ManyToOne(() => Fruit, fruit => fruit.id, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'fruitId',
  })
  fruits: Fruit;
}