
import * as dotenv from "dotenv";

const result = dotenv.config();

import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { Course } from "../enties/course";
import { Lesson } from "../enties/lesson";
import { User } from "../enties/user";

async function deleteDb() {

    await AppDataSource.initialize();

    console.log(`Database connection ready.`);

    console.log(`Clearing LESSONS table.`);

    await AppDataSource.getRepository(Lesson).delete({});

    console.log(`Clearing COURSES table.`);

    await AppDataSource.getRepository(Course).delete({});

    console.log(`Clearing USERS table.`);

    await AppDataSource.getRepository(User).delete({});

}


deleteDb()
    .then(() => {
        console.log(`Finished deleting database, exiting!`);
        process.exit(0);
    })
    .catch(err => {
        console.error(`Error deleting database.`, err);
    });