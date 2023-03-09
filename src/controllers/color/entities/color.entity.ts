import { fruitCategory } from '../../fruits/entities/fruitCategory.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/Vegetable.entity';
// import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';

@Entity('color')
export class Color {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}