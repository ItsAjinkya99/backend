import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('benefit')
export class Benefit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}