import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ShopVegetables')
export class ShopVegetables {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: false })
  shopId: number

  @Column()
  vegetableId: number;

  @Column()
  price: number;

}