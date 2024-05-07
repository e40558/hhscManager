"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionStore = void 0;
var session_1 = require("./session");
var SessionStore = /** @class */ (function () {
    function SessionStore() {
        this.sessions = {};
    }
    SessionStore.prototype.createSession = function (sessionId, user) {
        this.sessions[sessionId] = new session_1.Session(sessionId, user);
    };
    SessionStore.prototype.findUserBySessionId = function (sessionId) {
        var session = this.sessions[sessionId];
        var isSessionValid = session && session.isValid();
        return isSessionValid ? session.user : undefined;
    };
    return SessionStore;
}());
exports.sessionStore = new SessionStore();
