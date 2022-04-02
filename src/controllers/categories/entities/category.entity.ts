import { fruitCategory } from '../../fruits/entities/fruitCategory.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vendor } from 'src/controllers/vendor/entities/vendor.entity';
import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Vegetable, (vegetable) => vegetable.categories)
    vegetables: Vegetable[];

    /* @ManyToMany(() => fruitCategory, fruit => fruit.categories)
    fruits: Fruit[]; */
}