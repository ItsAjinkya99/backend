import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Shop } from 'src/controllers/shop/entities/shop.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity('vendor')
export class Vendor {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true, default:null})
  vendorId: number;

  /* @BeforeInsert()
  hashPassword() {
    this.name = (Math.floor(Math.random()*90000) + 10000).toString();
    // this.name = "vendor_db_"+this.name
    this.name = "vendor_db_16323"
  } */

}