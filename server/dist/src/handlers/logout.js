"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
function logout(request, response, nex) {
    response.clearCookie("SESSIONID");
    response.clearCookie("XSRF-TOKEN");
    response.status(200);
}
exports.logout = logout;
