import {Router} from 'express';
import { logout } from '../handlers/logout';


const router = Router();


router.post('/', logout);



export default router