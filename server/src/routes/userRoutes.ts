import { Router } from "express";
import { getUsers } from "../handlers/user";


const router= Router();

//const userController = new UserController();


router.get('/', getUsers);


//router.post('/', userController.add);



export default router;