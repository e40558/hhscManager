"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const result = dotenv.config();
require("reflect-metadata");
const data_source_1 = require("./src/data-source");
const course_1 = require("./src/enties/course");
const lesson_1 = require("./src/enties/lesson");
const db_data_1 = require("./data/db-data");
function populateDb() {
    return __awaiter(this, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize();
        console.log(`Database connection ready.`);
        const courses = Object.values(db_data_1.COURSES);
        const courseRepository = data_source_1.AppDataSource.getRepository(course_1.Course);
        const lessonsRepository = data_source_1.AppDataSource.getRepository(lesson_1.Lesson);
        for (let courseData of courses) {
            console.log(`Inserting course ${courseData.title}`);
            const course = courseRepository.create(courseData);
            yield courseRepository.save(course);
            for (let lessonData of courseData.lessons) {
                console.log(`Inserting lesson ${lessonData.title}`);
                const lesson = lessonsRepository.create(lessonData);
                lesson.course = course;
                yield lessonsRepository.save(lesson);
            }
        }
        const totalCourses = yield courseRepository
            .createQueryBuilder()
            .getCount();
        const totalLessons = yield lessonsRepository
            .createQueryBuilder()
            .getCount();
        console.log(` Data Inserted - courses ${totalCourses}, lessons ${totalLessons}`);
    });
}
populateDb()
    .then(() => {
    console.log(`Finished populating database, exiting!`);
    process.exit(0);
})
    .catch(err => {
    console.error(`Error populating database.`, err);
});
