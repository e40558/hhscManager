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
exports.createUser = void 0;
const logger_1 = require("../logger");
const data_source_1 = require("../data-source");
const user_1 = require("../enties/user");
const utils_1 = require("../utils/utils");
const crypto = require("crypto");
/**
 *
 * curl -X POST http://localhost:9000/api/users -H "Content-Type:application/json" -d '{"email": "new-user@angular-university.io", "pictureUrl":"https://avatars.githubusercontent.com/u/5454709", "password": "test123", "isAdmin": false}'
 *
 */
function createUser(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logger.debug(`Called createUser()`);
            const { email, firstName, lastName, pictureUrl, password, isAdmin } = request.body;
            if (!email) {
                throw "Could not extract the email from the request, aborting.";
            }
            if (!password) {
                throw "Could not extract the plain text password from the request, aborting.";
            }
            const repository = data_source_1.AppDataSource.getRepository(user_1.User);
            const user = yield repository.createQueryBuilder("users")
                .where("email = :email", { email })
                .getOne();
            if (user) {
                const message = `User with email ${email} already exists, aborting.`;
                logger_1.logger.error(message);
                response.status(500).json({ message });
                return;
            }
            const passwordSalt = crypto.randomBytes(64).toString('hex');
            const passwordHash = yield (0, utils_1.calculatePasswordHash)(password, passwordSalt);
            const newUser = repository.create({
                email,
                firstName,
                lastName,
                //  pictureUrl,
                // isAdmin,
                //  passwordHash,
                //   passwordSalt
            });
            yield data_source_1.AppDataSource.manager.save(newUser);
            logger_1.logger.info(`User ${email} has been created.`);
            response.status(200).json({
                email,
                pictureUrl,
                isAdmin
            });
        }
        catch (error) {
            logger_1.logger.error(`Error calling createUser()`);
            return next(error);
        }
    });
}
exports.createUser = createUser;
