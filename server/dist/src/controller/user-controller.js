"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const argon2 = require("argon2");
const user_service_1 = require("../service/user-service");
const passwordValidator_1 = require("../utils/passwordValidator");
const security_utils_1 = require("../utils/security.utils");
const session_store_1 = require("../utils/session-store");
const crypto = require("crypto");
class UserController {
    add(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logger.debug(`Called createUser()`);
                const credentials = request.body;
                if (!credentials.email) {
                    throw "Could not extract the email from the request, aborting.";
                }
                if (!credentials.password) {
                    throw "Could not extract the plain text password from the request, aborting.";
                }
                const user = yield (0, user_service_1.findUserByEmail)(credentials.email);
                logger_1.logger.info(user);
                if (user) {
                    const message = `User with email ${credentials.email} already exists, aborting.`;
                    logger_1.logger.error(message);
                    response.status(500).json({ message });
                    return;
                }
                const errors = (0, passwordValidator_1.validatePassword)(credentials.password);
                if (errors.length > 0) {
                    response.status(400).json({ errors });
                }
                else {
                    const passwordDigest = yield argon2.hash(credentials.password);
                    const user = yield (0, user_service_1.createUser)(credentials, passwordDigest);
                    const sessionId = yield (0, security_utils_1.randomBytes)(32).then(bytes => bytes.toString('hex'));
                    session_store_1.sessionStore.createSession(sessionId, user);
                    response.cookie("SESSIONID", sessionId), { httpOnly: true, secure: true };
                    response.status(200).json({ id: user.id, email: user.email });
                }
            }
            catch (error) {
                logger_1.logger.error(`Error calling createUser()`);
                return next(error);
            }
        });
    }
    //  async function  createUserAndSession(res:Response, credentials) {
    // const passwordDigest = await argon2.hash(credentials.password);
    //   const user = await createUser(credentials, passwordDigest); 
    //    const sessionId = await randomBytes(32).then(bytes => bytes.toString('hex'));
    // sessionStore.createSession(sessionId,user);
    //   res.cookie("SESSIONID",sessionId),{httpOnly:true, secure:true};
    //    res.status(200).json({id:user.id, email:user.email});
    //}
    getuser(res, credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO retrieve the actual user based on JWT content
            console.log("insiel");
            const user = {
                email: 'test@gmail.com'
            };
            if (user) {
                console.log('tesing');
                res.status(200).json(user);
            }
            else {
                res.sendStatus(204);
            }
        });
    }
}
module.exports = UserController;
