import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fruit')
export class Fruit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
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