"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var express_1 = require("express");
var coursesRoutes_1 = require("./coursesRoutes");
var routes = (0, express_1.Router)();
exports.routes = routes;
routes.use('/courses', coursesRoutes_1.default);
