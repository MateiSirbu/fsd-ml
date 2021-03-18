import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Dessert {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dessert: string;

    @Column()
    calories: number;

    @Column()
    fat: number;

    @Column()
    carbs: number;

    @Column()
    protein: number;

    @Column()
    sodium: number;

    @Column()
    calcium: string;

    @Column()
    iron: string;

}