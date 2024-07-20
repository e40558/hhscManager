
import {NextFunction, Request, Response} from "express";
import {logger} from "../logger";
import * as argon2 from 'argon2';
import { createUser, findUserByEmail, findUserById } from "../service/user-service";
import { validatePassword } from "../utils/passwordValidator";
import { randomBytes } from "../utils/security.utils";
import { sessionStore } from "../utils/session-store";
import { Location } from "../enties/location";
import { AppDataSource } from "../data-source";
import { Consumer } from "../enties/consumer";
import { isInteger } from "../utils/utils";
const crypto = require("crypto");



export async function getAllLocations(
  request: Request, response: Response, next:NextFunction) {

  try {

      logger.debug(`Called getAllLocation)`, request["user"]);

      const locations = await AppDataSource
          .getRepository(Location)
          .createQueryBuilder("locations")
          .orderBy("locations.seqNo")
          .getMany();

      response.status(200).json({locations});

  }
  catch (error) {
      logger.error(`Error calling getAllLocations()`);
      return next(error);
  }


}

export async function getLocationById(request: Request,response: Response, next:NextFunction){
  try {

    logger.debug(`Called findCourseByUrl()`);

    const locationId = parseInt(request.params.id);

    if (!locationId) {
        throw `Could not extract the locaton id from the request.`;
    }

    const location = await AppDataSource
        .getRepository(Location)
        .findOneBy({
            id: locationId
        });

    if (!location) {
        const message = `Could not find a course with url ${locationId}`;
        logger.error(message);
        response.status(404).json({message});
        return;
    }

    //const totalConsumers = await AppDataSource
    //    .getRepository(Consumer)
    //    .createQueryBuilder("consumers")
    //    .where("consumers.locationId = :locationId", {
    //        locationId: locationId
    //    })
    //    .getCount()

    response.status(200).json({
       location,
      
    });


}
catch (error) {
    logger.error(`Error calling findCourseByUrl()`);
    return next(error);
}

}
  
  
export async function addLocation (request: Request,response: Response,next :NextFunction){

  try {

    logger.debug(`Called createLocation()`);

    const data = request.body;

    if (!data) {
        throw `No data available, cannot save course.`;
    }

    const location = await AppDataSource.manager.transaction(
      "REPEATABLE READ",
        async (transactionalEntityManager) => {

          const repository = transactionalEntityManager.getRepository(Location);

          const result = await repository
              .createQueryBuilder("locations")
              .select("MAX(locations.seqNo)", "max")
              .getRawOne();

          const location = repository
              .create({
                  ...data,
                  seqNo: ( result?.max ?? 0 ) + 1
              });

          await repository.save(location);

          return location;
        }
    );

    response.status(200).json({location});

}
catch(error) {
    logger.error(`Error calling createCourse()`);
    return next(error);
}
  }

export async function updateLocation (request: Request,response: Response,next :NextFunction){
  try {

    logger.debug(`Called updateLocation)`);

    const locationId = request.params.id,
          changes = request.body;

    if (!isInteger(locationId)) {
        throw `Invalid locaton id ${locationId}`;
    }

    const id = parseInt(locationId)

    await AppDataSource
        .createQueryBuilder()
        .update(Location)
        .set(changes)
        .where("id = :id", {id})
        .execute();

    response.status(200).json({
        message: `Location ${locationId} was updated successfully.`
    });

}
catch (error) {
    logger.error(`Error calling updateLocaton()`);
    return next(error);
}
}

export async function deleteLocation (request: Request,response: Response,next :NextFunction){

    try {

        logger.debug(`Called deleteLocaton()`);

        const locationId = request.params.id;

        if (!isInteger(locationId)) {
            throw `Invalid courseId ${locationId}`;
        }

        await AppDataSource.manager.transaction(
            async (transactionalEntityManager) => {

                

                await transactionalEntityManager
                    .createQueryBuilder()
                    .delete()
                    .from(Location)
                    .where("id = :locationId",{locationId})
                    .execute();
            }
        );

        response.status(200).json({
            message: `Location deleted successfully ${locationId}`
        });

    }
    catch(error) {
        logger.error(`Error calling deleteLocation()`);
        return next(error);
    }
  }




