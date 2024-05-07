"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var courses_1 = require("../handlers/courses");
var router = (0, express_1.Router)();
//const userController = new UserController();
router.get('/', courses_1.getAllCourses);
router.get('/:id', courses_1.getCourseById);
router.post('/', courses_1.addCourse);
exports.default = router;
