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
exports.getUserById = exports.addUser = exports.getUser = exports.getUsers = void 0;
var logger_1 = require("../logger");
var argon2 = require("argon2");
var user_service_1 = require("../service/user-service");
var passwordValidator_1 = require("../utils/passwordValidator");
var security_utils_1 = require("../utils/security.utils");
var data_source_1 = require("../data-source");
var user_1 = require("../models/user");
var crypto = require("crypto");
function getUsers(request, response, next) {
    response.send([]);
}
exports.getUsers = getUsers;
function getUser(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, data_source_1.AppDataSource
                            .getRepository(user_1.User)
                            .findOneBy({
                            id: request["userId"]
                        })];
                case 1:
                    user = _a.sent();
                    if (user) {
                        response.status(200).json({ email: user.email, id: user.id });
                    }
                    else {
                        response.set(204);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUser = getUser;
function addUser(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var credentials, user, message, errors, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
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
                    if (errors.length > 0) {
                        response.status(400).json({ errors: errors });
                    }
                    else {
                        createUserAndSession(response, credentials)
                            .catch(function () { response.sendStatus(500); });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    logger_1.logger.error("Error calling createUser()");
                    return [2 /*return*/, next(error_2)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addUser = addUser;
function getUserById(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, data_source_1.AppDataSource
                            .getRepository(user_1.User)
                            .findOneBy({
                            id: request["userId"]
                        })];
                case 1:
                    user = _a.sent();
                    if (user) {
                        response.status(200).json(user);
                    }
                    else {
                        response.set(204);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUserById = getUserById;
function createUserAndSession(response, credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var passwordDigest, user, sessionToken, csrfToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, argon2.hash(credentials.password)];
                case 1:
                    passwordDigest = _a.sent();
                    return [4 /*yield*/, (0, user_service_1.createUser)(credentials, passwordDigest)];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, (0, security_utils_1.createSessionToken)(user.id.toString())];
                case 3:
                    sessionToken = _a.sent();
                    return [4 /*yield*/, (0, security_utils_1.createCsrfToken)()];
                case 4:
                    csrfToken = _a.sent();
                    response.cookie("SESSIONID", sessionToken), { httpOnly: true, secure: true };
                    response.cookie("XSRF-TOKEN", csrfToken);
                    response.status(200).json({ id: user.id, email: user.email });
                    return [2 /*return*/];
            }
        });
    });
}
