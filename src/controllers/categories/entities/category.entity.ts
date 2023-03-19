import { FruitCategory } from '../../fruits/entities/FruitCategory.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';
import { Fruit } from 'src/controllers/fruits/entities/Fruit.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/Vegetable.entity';

@Entity('Category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}