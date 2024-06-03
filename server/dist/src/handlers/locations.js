"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.addLocation = exports.getLocationById = exports.getAllLocations = void 0;
const logger_1 = require("../logger");
const location_1 = require("../enties/location");
const data_source_1 = require("../data-source");
const crypto = require("crypto");
function getAllLocations(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.debug(`Called getAllLocation)`, request["user"]);
            const locations = yield data_source_1.AppDataSource
                .getRepository(location_1.Location)
                .createQueryBuilder("locations")
                .orderBy("locations.seqNo")
                .getMany();
            response.status(200).json({ locations });
        }
        catch (error) {
            logger_1.logger.error(`Error calling getAllLocations()`);
            return next(error);
        }
    });
}
exports.getAllLocations = getAllLocations;
function getLocationById(request, response) {
    response.send({});
}
exports.getLocationById = getLocationById;
function addLocation(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.addLocation = addLocation;
function updateLocation(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.updateLocation = updateLocation;
function deleteLocation(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.deleteLocation = deleteLocation;
