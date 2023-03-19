import { FruitMineral } from '../../fruits/entities/FruitMineral.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Fruit } from 'src/controllers/fruits/entities/Fruit.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/Vegetable.entity';
import { Exclude } from 'class-transformer';
// import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';

@Entity('Mineral')
export class Mineral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: 0 })
  @Exclude()
  deleted: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdOn: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  modifiedOn: Date;

  @ManyToMany(() => FruitMineral, fruit => fruit.minerals)
  fruits: Fruit[];

  @ManyToMany(() => FruitMineral, fruit => fruit.minerals)
  vegetables: Fruit[];

}