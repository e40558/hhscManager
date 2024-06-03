"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionStore = void 0;
const session_1 = require("./session");
class SessionStore {
    constructor() {
        this.sessions = {};
    }
    destroySession(sessionId) {
        delete this.sessions[sessionId];
    }
    createSession(sessionId, user) {
        this.sessions[sessionId] = new session_1.Session(sessionId, user);
    }
    findUserBySessionId(sessionId) {
        const session = this.sessions[sessionId];
        return this.isSessionValid(sessionId) ? session.user : undefined;
    }
    isSessionValid(sessionId) {
        const session = this.sessions[sessionId];
        return session && session.isValid();
    }
}
exports.sessionStore = new SessionStore();
