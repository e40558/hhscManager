

import * as dotenv from "dotenv";

const result = dotenv.config();

import "reflect-metadata";

import {DeepPartial} from "typeorm";
import { AppDataSource } from "./data-source";
import { Course } from "./models/course";
import { COURSES } from "./models/db-data";
import { Lesson } from "./models/lesson";
import { User } from "./models/user";
import { calculatePasswordHash } from "./utils/utils";

async function populateDb() {

    await AppDataSource.initialize();

    console.log(`Database connection ready.`);

    const courses = Object.values(COURSES) as DeepPartial<Course>[];

    const courseRepository = AppDataSource.getRepository(Course);

    const lessonsRepository = AppDataSource.getRepository(Lesson);

    for (let courseData of courses) {

        console.log(`Inserting course ${courseData.title}`);

        const course = courseRepository.create(courseData);

        await courseRepository.save(course);

        for (let lessonData of courseData.lessons) {

            console.log(`Inserting lesson ${lessonData.title}`);

            const lesson = lessonsRepository.create(lessonData);

            lesson.course = course;

            await lessonsRepository.save(lesson);
        }

    }

 

    const totalCourses = await courseRepository
        .createQueryBuilder()
        .getCount();

    const totalLessons = await lessonsRepository
        .createQueryBuilder()
        .getCount();

    console.log(` Data Inserted - courses ${totalCourses}, lessons ${totalLessons}`);

}

populateDb()
    .then(() => {
        console.log(`Finished populating database, exiting!`);
        process.exit(0);
    })
    .catch(err => {
        console.error(`Error populating database.`, err);
    });