import { Router } from "express";
import { addLesson, deleteLesson, getAllLessons, getLessonById, updateLesson } from "../handlers/lesson";
import { checkIfAuthenticated } from "../middleware/authentication.middleware";
import { checkIfAuthorized } from "../middleware/authorization.middleware";
import _ = require("lodash");


const router= Router();

//const userController = new UserController();


router.get('/', checkIfAuthenticated,
                _.partial(checkIfAuthorized,['STUDENT']),
                getAllLessons);
router.get('/:id',getLessonById);
router.post('/', addLesson);
router.patch('/', updateLesson);
router.delete('/:id', deleteLesson)



export default router;