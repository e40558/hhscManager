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
exports.deleteConsumer = exports.updateConsumer = exports.addConsumer = exports.getConsumerById = exports.getAllConsumers = void 0;
const logger_1 = require("../logger");
const data_source_1 = require("../data-source");
const utils_1 = require("../utils/utils");
const consumer_1 = require("../enties/consumer");
const crypto = require("crypto");
function getAllConsumers(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.debug(`Called getAllConsumer)`, request["user"]);
            const consumers = yield data_source_1.AppDataSource
                .getRepository(consumer_1.Consumer)
                .createQueryBuilder("consumers")
                .orderBy("consumers.seqNo")
                .getMany();
            response.status(200).json({ consumers });
        }
        catch (error) {
            logger_1.logger.error(`Error calling getAllConsumers()`);
            return next(error);
        }
    });
}
exports.getAllConsumers = getAllConsumers;
function getConsumerById(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.debug(`Called findCourseByUrl()`);
            const consumerId = parseInt(request.params.id);
            if (!consumerId) {
                throw `Could not extract the locaton id from the request.`;
            }
            const consumer = yield data_source_1.AppDataSource
                .getRepository(consumer_1.Consumer)
                .findOneBy({
                id: consumerId
            });
            if (!consumer) {
                const message = `Could not find a course with url ${consumerId}`;
                logger_1.logger.error(message);
                response.status(404).json({ message });
                return;
            }
            //const totalConsumers = await AppDataSource
            //    .getRepository(Consumer)
            //    .createQueryBuilder("consumers")
            //    .where("consumers.consumerId = :consumerId", {
            //        consumerId: consumerId
            //    })
            //    .getCount()
            response.status(200).json({
                consumer,
            });
        }
        catch (error) {
            logger_1.logger.error(`Error calling findCourseByUrl()`);
            return next(error);
        }
    });
}
exports.getConsumerById = getConsumerById;
function addConsumer(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.debug(`Called createConsumer()`);
            const data = request.body;
            if (!data) {
                throw `No data available, cannot save course.`;
            }
            const consumer = yield data_source_1.AppDataSource.manager.transaction("REPEATABLE READ", (transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const repository = transactionalEntityManager.getRepository(consumer_1.Consumer);
                const result = yield repository
                    .createQueryBuilder("consumers")
                    .select("MAX(consumers.seqNo)", "max")
                    .getRawOne();
                const consumer = repository
                    .create(Object.assign(Object.assign({}, data), { seqNo: ((_a = result === null || result === void 0 ? void 0 : result.max) !== null && _a !== void 0 ? _a : 0) + 1 }));
                yield repository.save(consumer);
                return consumer;
            }));
            response.status(200).json(consumer);
        }
        catch (error) {
            logger_1.logger.error(`Error calling createCourse()`);
            return next(error);
        }
    });
}
exports.addConsumer = addConsumer;
function updateConsumer(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.debug(`Called updateconsumer)`);
            const consumerId = request.params.id, changes = request.body;
            if (!(0, utils_1.isInteger)(consumerId)) {
                throw `Invalid locaton id ${consumerId}`;
            }
            const id = parseInt(consumerId);
            yield data_source_1.AppDataSource
                .createQueryBuilder()
                .update(consumer_1.Consumer)
                .set(changes)
                .where("id = :id", { id })
                .execute();
            response.status(200).json({
                message: `Consumer ${consumerId} was updated successfully.`
            });
        }
        catch (error) {
            logger_1.logger.error(`Error calling updateLocaton()`);
            return next(error);
        }
    });
}
exports.updateConsumer = updateConsumer;
function deleteConsumer(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.debug(`Called deleteLocaton()`);
            const consumerId = request.params.id;
            if (!(0, utils_1.isInteger)(consumerId)) {
                throw `Invalid courseId ${consumerId}`;
            }
            yield data_source_1.AppDataSource.manager.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                yield transactionalEntityManager
                    .createQueryBuilder()
                    .delete()
                    .from(consumer_1.Consumer)
                    .where("id = :consumerId", { consumerId })
                    .execute();
            }));
            response.status(200).json({
                message: `Consumer deleted successfully ${consumerId}`
            });
        }
        catch (error) {
            logger_1.logger.error(`Error calling deleteConsumer()`);
            return next(error);
        }
    });
}
exports.deleteConsumer = deleteConsumer;
