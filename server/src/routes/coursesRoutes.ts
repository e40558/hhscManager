import { Router } from "express";
import { getUserById,addUser, getUser } from "../handlers/users";
import { getAllCourses, getCourseById,  createCourse } from "../handlers/courses";


const router= Router();

//const userController = new UserController();


router.get('/', getAllCourses);
router.get('/:id',getCourseById);

router.post('/', createCourse);



export default router;