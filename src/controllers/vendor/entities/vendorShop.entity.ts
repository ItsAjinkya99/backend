import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
/* import { ShopVegetables } from './shopVegetables.entity';
import { ShopFruits } from './shopFruits.entity'; */

@Entity('shops')
export class vendorShops {
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

  /* @ManyToOne(() => User, user => user.shops, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'userId',
  })
  user: User; */

  /* @OneToMany(() => ShopVegetables, shopVegetable => shopVegetable.shop)
  vegetables: ShopVegetables[];
  
  @OneToMany(() => ShopFruits, shopFruit => shopFruit.shop)
  fruits: ShopFruits[]; */

}