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
exports.createCsrfToken = exports.decodeJwt = exports.createSessionToken = exports.signJwt = exports.randomBytes = void 0;
const util = require('util');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const fs = require("fs");
exports.randomBytes = util.promisify(crypto.randomBytes);
exports.signJwt = util.promisify(jwt.sign);
const RSA_PRIVATE_KEY = fs.readFileSync('./ssl/private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./ssl/public.key');
const SESSION_DURATION = 240;
function createSessionToken(user) {
    return (0, exports.signJwt)({
        roles: user.roles
    }, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 240,
        subject: user.id.toString()
    });
}
exports.createSessionToken = createSessionToken;
function decodeJwt(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = yield jwt.verify(token, RSA_PUBLIC_KEY);
        console.log(payload);
        return payload;
    });
}
exports.decodeJwt = decodeJwt;
function createCsrfToken() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, exports.randomBytes)(32).then(bytes => bytes.toString("hex"));
    });
}
exports.createCsrfToken = createCsrfToken;
