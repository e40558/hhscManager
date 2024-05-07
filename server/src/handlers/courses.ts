import {Response, Request, NextFunction} from "express";
import {logger} from "../logger";
import {AppDataSource} from "../data-source";
import {Course} from "../models/course";

export async function getAllCourses(
    request: Request, response: Response, next:NextFunction) {

    try {

        logger.debug(`Called getAllCourses()`, request["user"]);

        const courses = await AppDataSource
            .getRepository(Course)
            .createQueryBuilder("courses")
            .orderBy("courses.seqNo")
            .getMany();

        response.status(200).json({courses});

    }
    catch (error) {
        logger.error(`Error calling getAllCourses()`);
        return next(error);
    }


}

export async function getCourseById(
    request: Request, response: Response, next:NextFunction) {
}


export async function addCourse(
    request: Request, response: Response, next:NextFunction) {
}

export async function deleteCourse(
    request: Request, response: Response, next:NextFunction) {
}

export async function updateCourse(
    request: Request, response: Response, next:NextFunction) {
}



