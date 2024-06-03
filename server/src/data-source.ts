
import {DataSource} from "typeorm";
import { Course } from "./enties/course";
import { User } from "./enties/user";
import { Location } from "./enties/location";
import { Lesson } from "./enties/lesson";
import { Role } from "./enties/role";



export const AppDataSource = new DataSource({
    type: "postgres",
    host:"localhost",
  
    username: process.env.DB_USERNAME,
    password:  process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    ssl: false,
    entities: [ 
        Course,
        User,
        Lesson,
        Location,
        User,
        Role   
    ],
    synchronize:true,   
    logging:true
})
