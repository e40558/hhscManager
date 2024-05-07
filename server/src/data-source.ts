
import {DataSource} from "typeorm";
import { Course } from "./models/course";
import { User } from "./models/user";
import { Location } from "./models/location";
import { Lesson } from "./models/lesson";



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
        Location     
    ],
    synchronize:true,   
    logging:true
})
