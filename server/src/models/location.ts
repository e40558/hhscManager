import {
    Column, CreateDateColumn, Entity, OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {Lesson} from "./lesson";

@Entity({
    name: "LOCATIONS"
})
export class Location {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    seqNo:number;

    @Column()
    url:string;

    @Column()
    title:string;

    @Column()
    iconUrl:string;

    @Column()
    longDescription:string;

    @Column()
    category: string;

    @OneToMany(() => Lesson, lesson => lesson.course)
    lessons: Lesson[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    lastUpdatedAt: Date;
}