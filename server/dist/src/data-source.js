"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const course_1 = require("./enties/course");
const user_1 = require("./enties/user");
const location_1 = require("./enties/location");
const lesson_1 = require("./enties/lesson");
const role_1 = require("./enties/role");
const consumer_1 = require("./enties/consumer");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    ssl: false,
    entities: [
        course_1.Course,
        user_1.User,
        lesson_1.Lesson,
        consumer_1.Consumer,
        location_1.Location,
        user_1.User,
        role_1.Role
    ],
    synchronize: true,
    logging: true
});
