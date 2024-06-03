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
exports.getUserById = exports.addUser = exports.getUser = exports.getUsers = void 0;
const logger_1 = require("../logger");
const argon2 = require("argon2");
const user_service_1 = require("../service/user-service");
const passwordValidator_1 = require("../utils/passwordValidator");
const security_utils_1 = require("../utils/security.utils");
const data_source_1 = require("../data-source");
const user_1 = require("../enties/user");
const crypto = require("crypto");
function getUsers(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.debug(`Called getAllUsers()`);
            const users = yield data_source_1.AppDataSource
                .getRepository(user_1.User)
                .createQueryBuilder("users")
                .leftJoinAndSelect("users.roles", "ROLE")
                //.orderBy("courses.seqNo")
                .getMany();
            response.status(200).json({ users });
        }
        catch (error) {
            logger_1.logger.error(`Error calling getAllUsers()`);
            return next(error);
        }
    });
}
exports.getUsers = getUsers;
function getUser(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield data_source_1.AppDataSource
                .getRepository(user_1.User)
                .findOneBy({
                id: request["userId"]
            });
            if (user) {
                response.status(200).json({ email: user.email, id: user.id });
            }
            else {
                response.set(204);
            }
        }
        catch (error) {
        }
    });
}
exports.getUser = getUser;
function addUser(request, response, next) {
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
                createUserAndSession(response, credentials)
                    .catch(() => { response.sendStatus(500); });
            }
        }
        catch (error) {
            logger_1.logger.error(`Error calling createUser()`);
            return next(error);
        }
    });
}
exports.addUser = addUser;
function getUserById(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield data_source_1.AppDataSource
                .getRepository(user_1.User)
                .findOneBy({
                id: request["userId"]
            });
            if (user) {
                response.status(200).json(user);
            }
            else {
                response.set(204);
            }
        }
        catch (error) {
        }
    });
}
exports.getUserById = getUserById;
function createUserAndSession(response, credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordDigest = yield argon2.hash(credentials.password);
        const user = yield (0, user_service_1.createUser)(credentials, passwordDigest);
        const sessionToken = yield (0, security_utils_1.createSessionToken)(user);
        const csrfToken = yield (0, security_utils_1.createCsrfToken)();
        response.cookie("SESSIONID", sessionToken), { httpOnly: true, secure: true };
        response.cookie("XSRF-TOKEN", csrfToken);
        response.status(200).json({ id: user.id, email: user.email });
    });
}
