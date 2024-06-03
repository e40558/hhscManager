import {BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Role } from "./role";
import { Lesson } from "./lesson";


@Entity({
    name: "USERS"
})
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;


    @Column()
    firstName:string;

    @Column()
    lastName:string;

    

    @OneToMany(() => Role, role => role.user,{
       cascade:true,     
       eager:true
    })
    roles: Role[];
    
    @Column()
    passwordDigest:string;



  //  @Column()
 //   passwordHash:string;

   // @Column()
   // passwordSalt:string;

   // @Column()
   // pictureUrl:string;

    //@Column()
    //isAdmin:boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    lastUpdatedAt: Date;
}