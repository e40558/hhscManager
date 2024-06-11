import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Course } from "./course";
import {JoinColumn} from "typeorm";
import { User } from "./user";

@Entity({
    name: "ROLES"
})
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

   
    @Column()
    name:string;
    

   
}