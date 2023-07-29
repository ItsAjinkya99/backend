import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Vendor')
export class Vendor {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, default: null })
  vendorId: number;

}