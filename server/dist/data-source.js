"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var course_1 = require("./models/course");
var user_1 = require("./models/user");
var location_1 = require("./models/location");
var lesson_1 = require("./models/lesson");
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
        location_1.Location
    ],
    synchronize: true,
    logging: true
});
