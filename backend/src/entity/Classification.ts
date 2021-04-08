import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Classification {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    file: string;

    @Column()
    timestamp: string;

    @Column()
    result: number;
}