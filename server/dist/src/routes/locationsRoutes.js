"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locations_1 = require("../handlers/locations");
const router = (0, express_1.Router)();
//const userController = new UserController();
router.get('/', locations_1.getAllLocations);
router.get('/:id', locations_1.getLocationById);
router.post('/', locations_1.addLocation);
router.patch('/:id', locations_1.updateLocation);
router.delete('/:id', locations_1.deleteLocation);
exports.default = router;
