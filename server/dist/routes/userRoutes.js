"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController = require('../controller/user-controller');
var router = (0, express_1.Router)();
var userController = new UserController();
router.get('/', userController.getuser);
//router.post('/', userController.add);
exports.default = router;
