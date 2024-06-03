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
exports.loginAsUser = void 0;
const user_service_1 = require("../service/user-service");
const security_utils_1 = require("../utils/security.utils");
function loginAsUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const impersonatedUserEmail = req.body.email;
        const impersonatedUser = yield (0, user_service_1.findUserByEmail)(impersonatedUserEmail);
        (0, security_utils_1.createSessionToken)(impersonatedUser)
            .then(sessionToken => {
            res.cookie("SESSIONID", sessionToken, { httpOnly: true, secure: true });
            res.status(200).json({
                id: impersonatedUser.id,
                email: impersonatedUser.email,
                roles: impersonatedUser.roles
            });
        })
            .catch(err => {
            console.log("Error trying to login as user", err);
            res.sendStatus(500);
        });
    });
}
exports.loginAsUser = loginAsUser;
