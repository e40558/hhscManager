"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const moment = require("moment");
class Session {
    constructor(sessionId, user) {
        this.sessionId = sessionId;
        this.user = user;
        this.validUntil = moment().add(Session.VALIDITY_MINUTES, 'minutes');
    }
    isValid() {
        return moment().diff(this.validUntil, 'minutes') <= 0;
    }
}
exports.Session = Session;
Session.VALIDITY_MINUTES = 2;
