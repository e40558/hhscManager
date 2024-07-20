import {
    BaseEntity,
    Column, CreateDateColumn, Entity, OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {Lesson} from "./lesson";

@Entity({
    name: "LOCATIONS"
})
export class Location extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    seqNo:number;

   
    @Column()
    name:string;

    @Column()
    iconUrl?:string;

    @Column()
    phoneNum:string;

    @Column()
    city: string;

    @Column()
    zip: string;

    @Column()
    address: string;

    @Column()
    state: string;

    @OneToMany(() => Lesson, lesson => lesson.course)
    lessons: Lesson[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    lastUpdatedAt: Date;
}