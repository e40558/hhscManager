

import {Request, Response, request, response, NextFunction} from "express";
import * as argon2 from 'argon2';
import { User } from "../enties/user";
import { AppDataSource } from "../data-source";
import { logger } from "../logger";
import { Course } from "../enties/course";
import { Lesson } from "../enties/lesson";
import { createCsrfToken, createSessionToken, randomBytes } from "../utils/security.utils";
import { sessionStore } from "../utils/session-store";



export async function login(req: Request, res: Response,  next:NextFunction  ) {

    try {

        logger.debug(`Called findUserByEmail()`);

        const credentials = req.body;

        console.log (credentials);

        const user = await AppDataSource
            .getRepository(User)
            .findOneBy({
                email: credentials.email
            });

        if (!user) {          
            response.sendStatus(403);           
        }       
        else{
         loginAndBuildResponse(credentials,user,res);
        }

    


    }
    catch (error) {
        logger.error(`Error calling findUserByEmail()`);
        return next(error);
    }  

}

async function loginAndBuildResponse(credentials:any, user:User,  res: Response) {

    try {

        
        const sessionToken = await attemptLogin(credentials, user);

        const csrfToken = await createCsrfToken();

        console.log("Login successful");

        res.cookie("SESSIONID", sessionToken, {httpOnly:true, secure:true});

        res.cookie("XSRF-TOKEN", csrfToken);

        res.status(200).json({id:user.id, email:user.email});

    }
    catch(err) {

        console.log(err);

        res.sendStatus(403);
    }
}


async function attemptLogin(credentials:any, user:User) {

  
    const isPasswordValid = await argon2.verify(user.passwordDigest,
                                                credentials.password);



    if (!isPasswordValid) {
        throw new Error("Password Invalid");
    }
  
     return createSessionToken(user);

}