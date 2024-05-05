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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../logger");
var argon2 = require("argon2");
var user_service_1 = require("../service/user-service");
var passwordValidator_1 = require("../utils/passwordValidator");
var security_utils_1 = require("../utils/security.utils");
var session_store_1 = require("../utils/session-store");
var crypto = require("crypto");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.add = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, user, message, errors, passwordDigest, user_1, sessionId, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        logger_1.logger.debug("Called createUser()");
                        credentials = request.body;
                        if (!credentials.email) {
                            throw "Could not extract the email from the request, aborting.";
                        }
                        if (!credentials.password) {
                            throw "Could not extract the plain text password from the request, aborting.";
                        }
                        return [4 /*yield*/, (0, user_service_1.findUserByEmail)(credentials.email)];
                    case 1:
                        user = _a.sent();
                        logger_1.logger.info(user);
                        if (user) {
                            message = "User with email ".concat(credentials.email, " already exists, aborting.");
                            logger_1.logger.error(message);
                            response.status(500).json({ message: message });
                            return [2 /*return*/];
                        }
                        errors = (0, passwordValidator_1.validatePassword)(credentials.password);
                        if (!(errors.length > 0)) return [3 /*break*/, 2];
                        response.status(400).json({ errors: errors });
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, argon2.hash(credentials.password)];
                    case 3:
                        passwordDigest = _a.sent();
                        return [4 /*yield*/, (0, user_service_1.createUser)(credentials, passwordDigest)];
                    case 4:
                        user_1 = _a.sent();
                        return [4 /*yield*/, (0, security_utils_1.randomBytes)(32).then(function (bytes) { return bytes.toString('hex'); })];
                    case 5:
                        sessionId = _a.sent();
                        session_store_1.sessionStore.createSession(sessionId, user_1);
                        response.cookie("SESSIONID", sessionId), { httpOnly: true, secure: true };
                        response.status(200).json({ id: user_1.id, email: user_1.email });
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        logger_1.logger.error("Error calling createUser()");
                        return [2 /*return*/, next(error_1)];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    //  async function  createUserAndSession(res:Response, credentials) {
    // const passwordDigest = await argon2.hash(credentials.password);
    //   const user = await createUser(credentials, passwordDigest); 
    //    const sessionId = await randomBytes(32).then(bytes => bytes.toString('hex'));
    // sessionStore.createSession(sessionId,user);
    //   res.cookie("SESSIONID",sessionId),{httpOnly:true, secure:true};
    //    res.status(200).json({id:user.id, email:user.email});
    //}
    UserController.prototype.getuser = function (res, credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                //TODO retrieve the actual user based on JWT content
                console.log("insiel");
                user = {
                    email: 'test@gmail.com'
                };
                if (user) {
                    console.log('tesing');
                    res.status(200).json(user);
                }
                else {
                    res.sendStatus(204);
                }
                return [2 /*return*/];
            });
        });
    };
    return UserController;
}());
module.exports = UserController;
