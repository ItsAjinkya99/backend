import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Shop } from 'src/controllers/shop/entities/shop.entity';

@Entity('vendor')
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  email: string;

  @OneToMany(() => Shop, shop => shop.vendor)
  shops: Shop[];

  /* @Column({ nullable: false })
  shipping_address: string; */

}