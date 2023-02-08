import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Shop } from './shop.entity';
import { VendorShops } from 'src/controllers/vendor/entities/vendorShop.entity';

@Entity('ShopVegetables')
export class ShopVegetables {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  shopId: number

  @Column()
  vegetableId: number;

}