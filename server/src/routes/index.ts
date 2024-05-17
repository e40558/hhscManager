import { Request, Response, Router } from 'express';
import  course  from './coursesRoutes';




const routes = Router();

routes.use('/courses', course);

export { routes };