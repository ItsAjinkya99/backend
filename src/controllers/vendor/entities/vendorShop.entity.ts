import { Fruit } from 'src/controllers/fruits/entities/fruit.entity';
import { Shop } from 'src/controllers/shop/entities/shop.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity('vendorShop')
export class vendorShop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    vendorId: number;

    @Column()
    shopId: number;

    @ManyToOne(() => Shop, shop => shop.id, { eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'shopId',
    })
    shops: Shop;
}