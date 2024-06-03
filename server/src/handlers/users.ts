
import {NextFunction, Request, Response} from "express";
import {logger} from "../logger";
import * as argon2 from 'argon2';
import { createUser, findUserByEmail, findUserById } from "../service/user-service";
import { validatePassword } from "../utils/passwordValidator";
import { createCsrfToken, createSessionToken, randomBytes } from "../utils/security.utils";
import { sessionStore } from "../utils/session-store";
import { AppDataSource } from "../data-source";
import { User } from "../enties/user";
const crypto = require("crypto");




export async function getUsers(request: Request,response: Response,next :NextFunction){

    try {

        logger.debug(`Called getAllUsers()`);

        const users = await AppDataSource
            .getRepository(User)
            .createQueryBuilder("users")
            .leftJoinAndSelect("users.roles","ROLE")
            //.orderBy("courses.seqNo")
            .getMany();

        response.status(200).json({users});

    }
    catch (error) {
        logger.error(`Error calling getAllUsers()`);
        return next(error);
    }


}




export async function getUser(request: Request,response: Response,next :NextFunction){

    try {
    
        const id =request["userId"]
       
        const user = await AppDataSource
        .getRepository(User)
        .createQueryBuilder("users")
        .leftJoinAndSelect("users.roles","ROLE")
        .where("users.id = :id", {id: 4})
        .getOne();


        



        
    


        if(user){
           //response.status(200).json({email:user.email, id:user.id});
             response.status(200).json({user});
        }
        else{
            response.set(204);
    
        }
            
        } catch (error) {
            
        
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
            createUserAndSession(response,credentials)
              .catch(()=>{response.sendStatus(500)});
        }    

    }
    catch (error) {
        logger.error(`Error calling createUser()`);
        return next(error);
    }

}

export async function getUserById(request: Request,response: Response){

    try {
    
    const user =  await AppDataSource
    .getRepository(User)
    .findOneBy({
        id: request["userId"]
    });

    if(user){
        response.status(200).json(user);
    }
    else{
        response.set(204);

    }
        
    } catch (error) {
        
    
}
}

async function createUserAndSession(response: Response, credentials){

    const passwordDigest = await argon2.hash(credentials.password);

    const user = await createUser(credentials, passwordDigest); 

    const sessionToken = await createSessionToken(user);

    const csrfToken= await createCsrfToken();

    response.cookie("SESSIONID",sessionToken),{httpOnly:true, secure:true};

    response.cookie("XSRF-TOKEN",csrfToken)

    response.status(200).json({id:user.id, email:user.email});
}


