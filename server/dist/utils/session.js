"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
var moment = require("moment");
var Session = /** @class */ (function () {
    function Session(sessionId, user) {
        this.sessionId = sessionId;
        this.user = user;
        this.validUntil = moment().add(Session.VALIDITY_MINUTES, 'minutes');
    }
    Session.prototype.isValid = function () {
        return moment().diff(this.validUntil, 'minutes') <= 0;
    };
    Session.VALIDITY_MINUTES = 2;
    return Session;
}());
exports.Session = Session;
