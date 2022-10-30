import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subject{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({type: "varchar"})
    subject: string;
}