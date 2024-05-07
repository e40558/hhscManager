import { Router } from "express";
import { addLesson, deleteLesson, getAllLessons, getLessonById, updateLesson } from "../handlers/lesson";


const router= Router();

//const userController = new UserController();


router.get('/', getAllLessons);
router.get('/:id',getLessonById);
router.post('/', addLesson);
router.patch('/', updateLesson);
router.delete('/:id', deleteLesson)



export default router;