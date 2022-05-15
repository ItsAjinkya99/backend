import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Shop } from 'src/controllers/shop/entities/shop.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity('vendor')
export class Vendor extends User {

  @OneToMany(() => Shop, shop => shop.vendor)
  shops: Shop[];

}