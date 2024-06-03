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
exports.findUserByEmail = exports.findUserById = exports.getUser = exports.createUser = void 0;
const data_source_1 = require("../data-source");
const user_1 = require("../enties/user");
function createUser(user, passwordDigest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, firstName, lastName, roles } = user;
        console.log(user);
        const repository = data_source_1.AppDataSource.getRepository(user_1.User);
        const newUser = repository.create({
            email,
            firstName,
            lastName,
            passwordDigest,
            roles
            //  pictureUrl,
            // isAdmin,
            //  passwordHash,
            //   passwordSalt
        });
        user = yield data_source_1.AppDataSource.manager.save(newUser);
        return user;
    });
}
exports.createUser = createUser;
function getUser() {
}
exports.getUser = getUser;
function findUserById(id) {
    // return UserModel.findById(id);
}
exports.findUserById = findUserById;
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const repository = data_source_1.AppDataSource.getRepository(user_1.User);
        return yield repository.createQueryBuilder("users")
            .where("email = :email", { email })
            .getOne();
    });
}
exports.findUserByEmail = findUserByEmail;
