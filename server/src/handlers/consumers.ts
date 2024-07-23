
import {NextFunction, Request, Response} from "express";
import {logger} from "../logger";

import { AppDataSource } from "../data-source";
import { isInteger } from "../utils/utils";
import { Consumer } from "../enties/consumer";

const crypto = require("crypto");



export async function getAllConsumers(
  request: Request, response: Response, next:NextFunction) {

  try {

      logger.debug(`Called getAllConsumer)`, request["user"]);

      const consumers = await AppDataSource
          .getRepository(Consumer)
          .createQueryBuilder("consumers")
          .orderBy("consumers.seqNo")
          .getMany();

      response.status(200).json({consumers});

  }
  catch (error) {
      logger.error(`Error calling getAllConsumers()`);
      return next(error);
  }


}

export async function getConsumerById(request: Request,response: Response, next:NextFunction){
  try {

    logger.debug(`Called findCourseByUrl()`);

    const consumerId = parseInt(request.params.id);

    if (!consumerId) {
        throw `Could not extract the locaton id from the request.`;
    }

    const consumer = await AppDataSource
        .getRepository(Consumer)
        .findOneBy({
            id: consumerId
        });

    if (!consumer) {
        const message = `Could not find a course with url ${consumerId}`;
        logger.error(message);
        response.status(404).json({message});
        return;
    }

    //const totalConsumers = await AppDataSource
    //    .getRepository(Consumer)
    //    .createQueryBuilder("consumers")
    //    .where("consumers.consumerId = :consumerId", {
    //        consumerId: consumerId
    //    })
    //    .getCount()

    response.status(200).json({
       consumer,
      
    });


}
catch (error) {
    logger.error(`Error calling findCourseByUrl()`);
    return next(error);
}

}
  
  
export async function addConsumer (request: Request,response: Response,next :NextFunction){

  try {

    logger.debug(`Called createConsumer()`);

    const data = request.body;

    if (!data) {
        throw `No data available, cannot save course.`;
    }

    const consumer = await AppDataSource.manager.transaction(
      "REPEATABLE READ",
        async (transactionalEntityManager) => {

          const repository = transactionalEntityManager.getRepository(Consumer);

          const result = await repository
              .createQueryBuilder("consumers")
              .select("MAX(consumers.seqNo)", "max")
              .getRawOne();

          const consumer = repository
              .create({
                  ...data,
                  seqNo: ( result?.max ?? 0 ) + 1
              });

          await repository.save(consumer);

          return consumer;
        }
    );

    response.status(200).json(consumer);

}
catch(error) {
    logger.error(`Error calling createCourse()`);
    return next(error);
}
  }

export async function updateConsumer (request: Request,response: Response,next :NextFunction){
  try {

    logger.debug(`Called updateconsumer)`);

    const consumerId = request.params.id,
          changes = request.body;

    if (!isInteger(consumerId)) {
        throw `Invalid locaton id ${consumerId}`;
    }

    const id = parseInt(consumerId)

    await AppDataSource
        .createQueryBuilder()
        .update(Consumer)
        .set(changes)
        .where("id = :id", {id})
        .execute();

    response.status(200).json({
        message: `Consumer ${consumerId} was updated successfully.`
    });

}
catch (error) {
    logger.error(`Error calling updateLocaton()`);
    return next(error);
}
}

export async function deleteConsumer (request: Request,response: Response,next :NextFunction){

    try {

        logger.debug(`Called deleteLocaton()`);

        const consumerId = request.params.id;

        if (!isInteger(consumerId)) {
            throw `Invalid courseId ${consumerId}`;
        }

        await AppDataSource.manager.transaction(
            async (transactionalEntityManager) => {

                

                await transactionalEntityManager
                    .createQueryBuilder()
                    .delete()
                    .from(Consumer)
                    .where("id = :consumerId",{consumerId})
                    .execute();
            }
        );

        response.status(200).json({
            message: `Consumer deleted successfully ${consumerId}`
        });

    }
    catch(error) {
        logger.error(`Error calling deleteConsumer()`);
        return next(error);
    }
  }




