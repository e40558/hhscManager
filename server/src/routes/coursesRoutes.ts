import { Router } from "express";
import { getUserById,addUser, getUser } from "../handlers/users";
import { getAllCourses, getCourseById, addCourse } from "../handlers/courses";


const router= Router();

//const userController = new UserController();


router.get('/', getAllCourses);
router.get('/:id',getCourseById);

router.post('/', addCourse);



export default router;