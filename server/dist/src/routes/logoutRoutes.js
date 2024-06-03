"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logout_1 = require("../handlers/logout");
const router = (0, express_1.Router)();
router.post('/', logout_1.logout);
exports.default = router;
