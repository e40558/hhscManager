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
exports.login = void 0;
const express_1 = require("express");
const argon2 = require("argon2");
const user_1 = require("../enties/user");
const data_source_1 = require("../data-source");
const logger_1 = require("../logger");
const security_utils_1 = require("../utils/security.utils");
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.debug(`Called findUserByEmail()`);
            const credentials = req.body;
            const user = yield data_source_1.AppDataSource
                .getRepository(user_1.User)
                .findOneBy({
                email: credentials.email
            });
            if (!user) {
                express_1.response.sendStatus(403);
            }
            else {
                loginAndBuildResponse(credentials, user, res);
            }
        }
        catch (error) {
            logger_1.logger.error(`Error calling findUserByEmail()`);
            return next(error);
        }
    });
}
exports.login = login;
function loginAndBuildResponse(credentials, user, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sessionToken = yield attemptLogin(credentials, user);
            const csrfToken = yield (0, security_utils_1.createCsrfToken)();
            console.log("Login successful");
            res.cookie("SESSIONID", sessionToken, { httpOnly: true, secure: true });
            res.cookie("XSRF-TOKEN", csrfToken);
            res.status(200).json({ id: user.id, email: user.email });
        }
        catch (err) {
            console.log(err);
            res.sendStatus(403);
        }
    });
}
function attemptLogin(credentials, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const isPasswordValid = yield argon2.verify(user.passwordDigest, credentials.password);
        if (!isPasswordValid) {
            throw new Error("Password Invalid");
        }
        return (0, security_utils_1.createSessionToken)(user);
    });
}
