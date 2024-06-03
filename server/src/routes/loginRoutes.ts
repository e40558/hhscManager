import * as express from 'express';
import { login } from '../handlers/login';


const router= express.Router();



router.post('/', login);





export default router