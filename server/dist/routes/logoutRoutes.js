"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logout_1 = require("../handlers/logout");
var router = (0, express_1.Router)();
router.post('/', logout_1.logout);
exports.default = router;
