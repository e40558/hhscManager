import {NextFunction, Request, Response} from "express";
import {logger} from "../logger";
import * as argon2 from 'argon2';
import { createUser, findUserByEmail, findUserById } from "../service/user-service";
import { validatePassword } from "../utils/passwordValidator";
import { randomBytes } from "../utils/security.utils";
import { sessionStore } from "../utils/session-store";
const crypto = require("crypto");



class UserController{
  async add(
        request: Request, response: Response, next:NextFunction) {
    
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
   
  //  async function  createUserAndSession(res:Response, credentials) {

       
    
       // const passwordDigest = await argon2.hash(credentials.password);
    
     //   const user = await createUser(credentials, passwordDigest); 
        
    //    const sessionId = await randomBytes(32).then(bytes => bytes.toString('hex'));
    
       // sessionStore.createSession(sessionId,user);
    
    
     //   res.cookie("SESSIONID",sessionId),{httpOnly:true, secure:true};
    
    //    res.status(200).json({id:user.id, email:user.email});
    //}
    
 


    async getuser(res:Response, credentials) {
         //TODO retrieve the actual user based on JWT content
         console.log ("insiel")
       const user = {
        email:'test@gmail.com'
       };

    if (user) {
        console.log('tesing');
        res.status(200).json(user);
    }
    else {
        res.sendStatus(204);
    }

          
    }
    
}


module.exports = UserController;

