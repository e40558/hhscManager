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
    name:string;    
   
    @Column()
    assisted:boolean;
    

    @Column()
    dateAssisted:string;
    
    @Column()
    dayOFWeek:string;

    @Column()
    initial:string;
    
    @Column()
    signature:string;
    
    @Column()
    localCaseNum:string;
    
    @Column()
    residentalType:string;
    
    @Column()
    typeOfservice:string;

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