import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Course } from "./course";
import {JoinColumn} from "typeorm";
import { Person } from "../dto/person";

@Entity({
    name: "CONSUMERS"
})
export class Consumer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;
   
    @Column()
    first_name:string;    
   
    @Column()
    last_name:string;
    
    @Column()
    address:string;
    
    @Column()
    phone:string;

    @Column()
    localCaseNum:string;
    
    @Column()
    dob:string;
    
    @Column()
    dateOfEnrollment:string;
    
    @Column()
    levelOfNeed:string;
    
    @Column()
    medicaidNum:string;

    @Column()
    seqNo: number;

   // @ManyToOne(() => Course, course => course.lessons)
   // @JoinColumn({
   //     name: "courseId"
   // })
   // course: Course;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    lastUpdatedAt: Date;
}