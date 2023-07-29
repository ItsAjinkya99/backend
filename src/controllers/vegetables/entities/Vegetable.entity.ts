import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Vegetable')
export class Vegetable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  mainImage: string;

  // 0 = Not approved yet, 1 = Approved, 3 = Disapproved
  @Column({ type: 'enum', enum: [0, 1, 2], enumName: 'roles', default: 0 })
  approved: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdOn: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  modifiedOn: Date;

}