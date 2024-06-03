import { Router } from "express";
import { getUserById,addUser, getUser } from "../handlers/users";
import { getAllCourses, getCourseById, addCourse } from "../handlers/courses";
import { LegacyOracleNamingStrategy } from "typeorm";
import { loginAsUser } from "../handlers/loginAsUser";
import { checkIfAuthenticated } from "../middleware/authentication.middleware";
import { checkIfAuthorized } from "../middleware/authorization.middleware";
import _ = require("lodash");


const router= Router();


router.post('/', checkIfAuthenticated,
                 _.partial(checkIfAuthorized,['ADMIN']), 
                 loginAsUser );



export default router;