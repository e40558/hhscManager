"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
var session_store_1 = require("../utils/session-store");
function logout(request, response, nex) {
    var sessionId = response.cookie['SESSIONID'];
    session_store_1.sessionStore.destroySession(sessionId);
    response.clearCookie("SESSIONID");
    response.clearCookie("XSRF-TOKEN");
    response.status(200).json({ message: 'Logout Successful' });
}
exports.logout = logout;
