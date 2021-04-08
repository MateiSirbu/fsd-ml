import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Classification {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    timestamp: Date;

}