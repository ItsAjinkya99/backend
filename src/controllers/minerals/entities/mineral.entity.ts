import { fruitMineral } from '../../fruits/entities/fruitMineral.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { Exclude } from 'class-transformer';
// import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';

@Entity('mineral')
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

  @ManyToMany(() => fruitMineral, fruit => fruit.minerals)
  fruits: Fruit[];

  @ManyToMany(() => fruitMineral, fruit => fruit.minerals)
  vegetables: Fruit[];

}