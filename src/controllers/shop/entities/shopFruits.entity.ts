import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ShopFruits')
export class ShopFruits {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: false })
  shopId: number

  @Column()
  fruitId: number;

  @Column()
  price: number;

}