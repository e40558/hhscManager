import {Response, Request, NextFunction} from "express";
import {logger} from "../logger";
import {AppDataSource} from "../data-source";
import {Course} from "../models/course";
import { Lesson } from "../models/lesson";

export async function getAllCourses(
    request: Request, response: Response, next:NextFunction) {

    try {

        logger.debug(`Called getAllCourses()`, request["user"]);

        const courses = await AppDataSource
            .getRepository(Course)
            .createQueryBuilder("courses")
           // .leftJoinAndSelect("courses.lessons","LESSON")
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

        try {

            logger.debug(`Called findCourseByUrl()`);
    
            const courseUrl = request.params.courseUrl;
    
            if (!courseUrl) {
                throw `Could not extract the course url from the request.`;
            }
    
            const course = await AppDataSource
                .getRepository(Course)
                .findOneBy({
                    url: courseUrl
                });
    
            if (!course) {
                const message = `Could not find a course with url ${courseUrl}`;
                logger.error(message);
                response.status(404).json({message});
                return;
            }
    
            const totalLessons = await AppDataSource
                .getRepository(Lesson)
                .createQueryBuilder("lessons")
                .where("lessons.courseId = :courseId", {
                    courseId: course.id
                })
                .getCount()
    
            response.status(200).json({
               course,
               totalLessons
            });
    
    
        }
        catch (error) {
            logger.error(`Error calling findCourseByUrl()`);
            return next(error);
        }   

        
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



