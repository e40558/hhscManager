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
exports.calculatePasswordHash = exports.isInteger = void 0;
const crypto = require("crypto");
const util = require("util");
const hashPassword = util.promisify(crypto.pbkdf2);
function isInteger(input) {
    var _a;
    return (_a = input === null || input === void 0 ? void 0 : input.match(/^\d+$/)) !== null && _a !== void 0 ? _a : false;
}
exports.isInteger = isInteger;
function calculatePasswordHash(plainTextPassword, passwordSalt) {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordHash = yield hashPassword(plainTextPassword, passwordSalt, 1000, 64, "sha512");
        return passwordHash.toString("hex");
    });
}
exports.calculatePasswordHash = calculatePasswordHash;
