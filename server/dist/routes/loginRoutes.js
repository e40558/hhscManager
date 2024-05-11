"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var login_1 = require("../handlers/login");
var router = (0, express_1.Router)();
router.post('/', login_1.login);
exports.default = router;
