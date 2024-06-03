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
exports.updateCourse = exports.deleteCourse = exports.addCourse = exports.getCourseById = exports.getAllCourses = void 0;
const logger_1 = require("../logger");
const data_source_1 = require("../data-source");
const course_1 = require("../enties/course");
const lesson_1 = require("../enties/lesson");
function getAllCourses(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.debug(`Called getAllCourses()`, request["user"]);
            const courses = yield data_source_1.AppDataSource
                .getRepository(course_1.Course)
                .createQueryBuilder("courses")
                // .leftJoinAndSelect("courses.lessons","LESSON")
                .orderBy("courses.seqNo")
                .getMany();
            response.status(200).json({ courses });
        }
        catch (error) {
            logger_1.logger.error(`Error calling getAllCourses()`);
            return next(error);
        }
    });
}
exports.getAllCourses = getAllCourses;
function getCourseById(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.debug(`Called findCourseByUrl()`);
            const courseUrl = request.params.courseUrl;
            if (!courseUrl) {
                throw `Could not extract the course url from the request.`;
            }
            const course = yield data_source_1.AppDataSource
                .getRepository(course_1.Course)
                .findOneBy({
                url: courseUrl
            });
            if (!course) {
                const message = `Could not find a course with url ${courseUrl}`;
                logger_1.logger.error(message);
                response.status(404).json({ message });
                return;
            }
            const totalLessons = yield data_source_1.AppDataSource
                .getRepository(lesson_1.Lesson)
                .createQueryBuilder("lessons")
                .where("lessons.courseId = :courseId", {
                courseId: course.id
            })
                .getCount();
            response.status(200).json({
                course,
                totalLessons
            });
        }
        catch (error) {
            logger_1.logger.error(`Error calling findCourseByUrl()`);
            return next(error);
        }
    });
}
exports.getCourseById = getCourseById;
function addCourse(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.addCourse = addCourse;
function deleteCourse(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.deleteCourse = deleteCourse;
function updateCourse(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.updateCourse = updateCourse;
