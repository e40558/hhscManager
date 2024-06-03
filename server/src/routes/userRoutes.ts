import * as express from 'express';
import { getUserById,addUser, getUser, getUsers } from "../handlers/users";


const router= express.Router();

//const userController = new UserController();


router.get('/', getUser);
router.get('/:id',getUserById);
router.post('/', addUser);



export default router;