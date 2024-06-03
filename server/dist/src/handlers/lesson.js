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
exports.updateLesson = exports.deleteLesson = exports.addLesson = exports.getLessonById = exports.getAllLessons = void 0;
const logger_1 = require("../logger");
const data_source_1 = require("../data-source");
const lesson_1 = require("../enties/lesson");
function getAllLessons(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lessons = yield data_source_1.AppDataSource
                .getRepository(lesson_1.Lesson)
                .createQueryBuilder("lessons")
                .orderBy("lessons.seqNo")
                .getMany();
            response.status(200).json({ lessons });
        }
        catch (error) {
            logger_1.logger.error(`Error calling getAllCourses()`);
            return next(error);
        }
    });
}
exports.getAllLessons = getAllLessons;
function getLessonById(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.getLessonById = getLessonById;
function addLesson(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.addLesson = addLesson;
function deleteLesson(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.deleteLesson = deleteLesson;
function updateLesson(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.updateLesson = updateLesson;
