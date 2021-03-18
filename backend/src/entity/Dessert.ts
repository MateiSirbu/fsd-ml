import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Dessert {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Dessert: string;

    @Column()
    Calories: number;

    @Column()
    Fat: number;

    @Column()
    Carbs: number;

    @Column()
    Protein: number;

    @Column()
    Sodium: number;

    @Column()
    Calcium: string;

    @Column()
    Iron: string;

}