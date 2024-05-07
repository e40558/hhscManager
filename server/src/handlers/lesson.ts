import {Response, Request, NextFunction} from "express";
import {logger} from "../logger";
import {AppDataSource} from "../data-source";
import {Course} from "../models/course";
import { Lesson } from "../models/lesson";

export async function getAllLessons(
    request: Request, response: Response, next:NextFunction) {

    try {

        logger.debug(`Called getAllLesson()`, request["user"]);

        const lessons = await AppDataSource
            .getRepository(Lesson)
            .createQueryBuilder("lessons")
            .orderBy("lessons.seqNo")
            .getMany();

        response.status(200).json({lessons});

    }
    catch (error) {
        logger.error(`Error calling getAllCourses()`);
        return next(error);
    }


}

export async function getLessonById(
    request: Request, response: Response, next:NextFunction) {
}


export async function addLesson(
    request: Request, response: Response, next:NextFunction) {
}

export async function deleteLesson(
    request: Request, response: Response, next:NextFunction) {
}

export async function updateLesson(
    request: Request, response: Response, next:NextFunction) {
}



