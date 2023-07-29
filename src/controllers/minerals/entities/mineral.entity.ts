import { FruitMineral } from '../../fruits/entities/FruitMineral.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Fruit } from '../../../controllers/fruits/entities/Fruit.entity';
import { Exclude } from 'class-transformer';

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
  fruits: Relation<Fruit[]>;

  @ManyToMany(() => FruitMineral, fruit => fruit.minerals)
  vegetables: Relation<Fruit[]>;

}