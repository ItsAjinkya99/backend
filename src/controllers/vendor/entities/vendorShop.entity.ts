import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { ShopFruits } from 'src/controllers/shop/entities/shopFruits.entity';
import { ShopVegetables } from 'src/controllers/shop/entities/shopVegetables.entity';

@Entity('VendorShops')
export class VendorShops {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  contact: string;

  @Column()
  userId: number

  @Column()
  shopId: number

}