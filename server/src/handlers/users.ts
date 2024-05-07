
import {NextFunction, Request, Response} from "express";
import {logger} from "../logger";
import * as argon2 from 'argon2';
import { createUser, findUserByEmail, findUserById } from "../service/user-service";
import { validatePassword } from "../utils/passwordValidator";
import { randomBytes } from "../utils/security.utils";
import { sessionStore } from "../utils/session-store";
const crypto = require("crypto");




export  function getUsers(request: Request,response: Response,next :NextFunction){

    response.send([]);

}


export  function getUser(request: Request,response: Response,next :NextFunction){

   const sessionId = request.cookies['SESSIONID'];
   
   const user = sessionStore.findUserBySessionId(sessionId);
  
   if(user){
    response.status(200).json(user);
   }
   else {
    response.sendStatus(204);
   }


}


export async function addUser (request: Request,response: Response,next :NextFunction){
    try {

        logger.debug(`Called createUser()`);

      
        const credentials = request.body;

        if (!credentials.email) {
            throw "Could not extract the email from the request, aborting.";
        }

        if (!credentials.password) {
            throw  "Could not extract the plain text password from the request, aborting."
        }

      

        const user = await findUserByEmail (credentials.email)

        logger.info(user);

        if (user) {
            const message = `User with email ${credentials.email} already exists, aborting.`;
            logger.error(message);
            response.status(500).json({message});
            return;
        }




        const errors = validatePassword(credentials.password);
    
        if (errors.length > 0) {
            response.status(400).json({errors});
        }
        else {
             const passwordDigest = await argon2.hash(credentials.password);

             const user = await createUser(credentials, passwordDigest); 
    
             const sessionId = await randomBytes(32).then(bytes => bytes.toString('hex'));

             sessionStore.createSession(sessionId,user);


             response.cookie("SESSIONID",sessionId),{httpOnly:true, secure:true};

             response.status(200).json({id:user.id, email:user.email});
        }    

    }
    catch (error) {
        logger.error(`Error calling createUser()`);
        return next(error);
    }

}

export function getUserById(request: Request,response: Response){
  response.send({});
}