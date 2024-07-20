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
const utils_1 = require("../utils/utils");
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
function getLocationById(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.debug(`Called findCourseByUrl()`);
            const locationId = parseInt(request.params.id);
            if (!locationId) {
                throw `Could not extract the locaton id from the request.`;
            }
            const location = yield data_source_1.AppDataSource
                .getRepository(location_1.Location)
                .findOneBy({
                id: locationId
            });
            if (!location) {
                const message = `Could not find a course with url ${locationId}`;
                logger_1.logger.error(message);
                response.status(404).json({ message });
                return;
            }
            //const totalConsumers = await AppDataSource
            //    .getRepository(Consumer)
            //    .createQueryBuilder("consumers")
            //    .where("consumers.locationId = :locationId", {
            //        locationId: locationId
            //    })
            //    .getCount()
            response.status(200).json({
                location,
            });
        }
        catch (error) {
            logger_1.logger.error(`Error calling findCourseByUrl()`);
            return next(error);
        }
    });
}
exports.getLocationById = getLocationById;
function addLocation(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.debug(`Called createLocation()`);
            const data = request.body;
            if (!data) {
                throw `No data available, cannot save course.`;
            }
            const location = yield data_source_1.AppDataSource.manager.transaction("REPEATABLE READ", (transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const repository = transactionalEntityManager.getRepository(location_1.Location);
                const result = yield repository
                    .createQueryBuilder("locations")
                    .select("MAX(locations.seqNo)", "max")
                    .getRawOne();
                const location = repository
                    .create(Object.assign(Object.assign({}, data), { seqNo: ((_a = result === null || result === void 0 ? void 0 : result.max) !== null && _a !== void 0 ? _a : 0) + 1 }));
                yield repository.save(location);
                return location;
            }));
            response.status(200).json({ location });
        }
        catch (error) {
            logger_1.logger.error(`Error calling createCourse()`);
            return next(error);
        }
    });
}
exports.addLocation = addLocation;
function updateLocation(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.debug(`Called updateLocation)`);
            const locationId = request.params.id, changes = request.body;
            if (!(0, utils_1.isInteger)(locationId)) {
                throw `Invalid locaton id ${locationId}`;
            }
            const id = parseInt(locationId);
            yield data_source_1.AppDataSource
                .createQueryBuilder()
                .update(location_1.Location)
                .set(changes)
                .where("id = :id", { id })
                .execute();
            response.status(200).json({
                message: `Location ${locationId} was updated successfully.`
            });
        }
        catch (error) {
            logger_1.logger.error(`Error calling updateLocaton()`);
            return next(error);
        }
    });
}
exports.updateLocation = updateLocation;
function deleteLocation(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.debug(`Called deleteLocaton()`);
            const locationId = request.params.id;
            if (!(0, utils_1.isInteger)(locationId)) {
                throw `Invalid courseId ${locationId}`;
            }
            yield data_source_1.AppDataSource.manager.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                yield transactionalEntityManager
                    .createQueryBuilder()
                    .delete()
                    .from(location_1.Location)
                    .where("id = :locationId", { locationId })
                    .execute();
            }));
            response.status(200).json({
                message: `Location deleted successfully ${locationId}`
            });
        }
        catch (error) {
            logger_1.logger.error(`Error calling deleteLocation()`);
            return next(error);
        }
    });
}
exports.deleteLocation = deleteLocation;
