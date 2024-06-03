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
const data_source_1 = require("../data-source");
const course_1 = require("../enties/course");
const lesson_1 = require("../enties/lesson");
const user_1 = require("../enties/user");
function deleteDb() {
    return __awaiter(this, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize();
        console.log(`Database connection ready.`);
        console.log(`Clearing LESSONS table.`);
        yield data_source_1.AppDataSource.getRepository(lesson_1.Lesson).delete({});
        console.log(`Clearing COURSES table.`);
        yield data_source_1.AppDataSource.getRepository(course_1.Course).delete({});
        console.log(`Clearing USERS table.`);
        yield data_source_1.AppDataSource.getRepository(user_1.User).delete({});
    });
}
deleteDb()
    .then(() => {
    console.log(`Finished deleting database, exiting!`);
    process.exit(0);
})
    .catch(err => {
    console.error(`Error deleting database.`, err);
});
