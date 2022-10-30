import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Subject } from "./subject";
import {
    Min,
    Max,
} from "class-validator";

export enum Status {
  LIVE = "live",
  SUSPENDED = "suspended",
}

@Entity()
export class Student {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ type: "varchar", length: 50 })
  first_name: string;
  @Column({ type: "varchar", length: 50, nullable: true })
  last_name: string;
  @Column({ type: "timestamptz" })
  dob: Date;
  @Column({ type: "int"})
  @Min(1)
  @Max(100)
  age: number;
  @Column()
  standard: number;
  @Column({ type: "varchar"})
  skills: string;
  @Column({ type: "varchar" })
  intro: string;
  @Column({ type: "timestamptz" })
  enrolment_from: Date;
  @Column({ type: "timestamptz" })
  enrolment_to: Date;
  @Column({ type: "enum", enum: Status })
  status: Status;
  @Column({ type: "boolean" })
  is_active: boolean;
  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[];
}
