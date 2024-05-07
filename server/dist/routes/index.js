"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userRoutes_1 = require("./userRoutes");
var router = express.Router();
router.get("/healthcheck", function (_, res) { return res.sendStatus(200); });
router.use('/user', userRoutes_1.default);
exports.default = router;
