


import moment = require("moment");
const util = require('util');
const crypto = require('crypto');
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";



export const randomBytes = util.promisify(crypto.randomBytes);
export const signJwt = util.promisify(jwt.sign);



const RSA_PRIVATE_KEY = fs.readFileSync('./ssl/private.key');

const RSA_PUBLIC_KEY = fs.readFileSync('./ssl/public.key');

const SESSION_DURATION = 240;

export  function createSessionToken(userId:string){
  
  return signJwt({}, RSA_PRIVATE_KEY,{
        algorithm: 'RS256',
        expiresIn: 240,
        subject: userId
    });
}

export async function  decodeJwt(token:string){
 const payload = await jwt.verify(token,RSA_PUBLIC_KEY);
 console.log(payload);
 return  payload
}

export async function createCsrfToken() {
  return await randomBytes(32).then(bytes => bytes.toString("hex"));
}


