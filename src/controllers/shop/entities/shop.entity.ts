import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';

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

  @ManyToOne(() => Vendor, vendor => vendor.shops, { eager: true })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'vendorId',
  })
  vendor: Vendor;

}