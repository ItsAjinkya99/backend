import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Shop } from './shop.entity';

@Entity('ShopFruits')
export class ShopFruits {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fruitId: number;

  @Column({ default: null })
  shopId: number

  /* @ManyToOne(() => Shop, shop => shop.fruits, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'shopId',
  })
  shop: Shop; */

}