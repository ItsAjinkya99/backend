import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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