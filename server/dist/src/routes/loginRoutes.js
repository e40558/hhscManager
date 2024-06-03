"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const login_1 = require("../handlers/login");
const router = express.Router();
router.post('/', login_1.login);
exports.default = router;
