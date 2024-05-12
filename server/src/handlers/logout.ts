import { Response, Request, NextFunction } from "express"
import { sessionStore } from "../utils/session-store";



export function  logout (request:Request, response:Response, nex:NextFunction)
{
     
    response.clearCookie("SESSIONID");

    response.clearCookie("XSRF-TOKEN");

    response.status(200);

}