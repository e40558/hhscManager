
import {NextFunction, Request, Response} from "express";
import {logger} from "../logger";
import * as argon2 from 'argon2';
import { createUser, findUserByEmail, findUserById } from "../service/user-service";
import { validatePassword } from "../utils/passwordValidator";
import { randomBytes } from "../utils/security.utils";
import { sessionStore } from "../utils/session-store";
import { Location } from "../models/location";
import { AppDataSource } from "../data-source";
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

export function getLocationById(request: Request,response: Response){
    response.send({});
}
  
  
export async function addLocation (request: Request,response: Response,next :NextFunction){
  }

export async function updateLocation (request: Request,response: Response,next :NextFunction){
}

export async function deleteLocation (request: Request,response: Response,next :NextFunction){
  }




