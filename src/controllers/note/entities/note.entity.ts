import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('note')
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}