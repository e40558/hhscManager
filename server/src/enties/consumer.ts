import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Course } from "./course";
import {JoinColumn} from "typeorm";
import { Person } from "../dto/person";

@Entity({
    name: ""
})
export class Consumer extends Person{

   
    @Column()
    title:string;

    @Column()
    duration:string;

    @Column()
    seqNo: number;

    @ManyToOne(() => Course, course => course.lessons)
    @JoinColumn({
        name: "courseId"
    })
    course: Course;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    lastUpdatedAt: Date;
}