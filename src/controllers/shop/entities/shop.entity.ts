import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { ShopVegetables } from './shopVegetables.entity';
import { ShopFruits } from './shopFruits.entity';

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  email: string;

  @Column()
  vendorId: number

}