import { FruitCategory } from '../../fruits/entities/FruitCategory.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Fruit } from 'src/controllers/fruits/entities/Fruit.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/Vegetable.entity';
// import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';

@Entity('color')
export class Color {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}