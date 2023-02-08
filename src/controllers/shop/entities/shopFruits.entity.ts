import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Shop } from './shop.entity';
import { VendorShops } from 'src/controllers/vendor/entities/vendorShop.entity';

@Entity('ShopFruits')
export class ShopFruits {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  shopId: number

  @Column()
  fruitId: number;

}