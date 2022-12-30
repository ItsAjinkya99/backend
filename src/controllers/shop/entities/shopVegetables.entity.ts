import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Shop } from './shop.entity';

@Entity('ShopVegetables')
export class ShopVegetables {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vegetableId: number;

  @Column({ default: null })
  shopId: number

  /* @ManyToOne(() => Shop, shop => shop.vegetables, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'shopId',
  })
  shop: Shop; */

}