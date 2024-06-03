"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfAuthorized = void 0;
const _ = require("lodash");
function checkIfAuthorized(allowedRoles, req, res, next) {
    const userInfo = req['user'];
    const roles = _.intersection(userInfo.roles, allowedRoles);
    if (roles.length > 0) {
        next();
    }
    else {
        res.sendStatus(403);
    }
}
exports.checkIfAuthorized = checkIfAuthorized;
