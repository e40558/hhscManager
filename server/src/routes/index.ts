
import * as express from 'express';
import { checkIfAuthenticated } from '../middleware/authentication.middleware';
import { checkCsrfToken } from '../middleware/csrf.middleware';

import userRoutes from "./userRoutes";
import lessonRoutes from "./lessonsRoutes";
import locationRoutes from "./locationsRoutes";
import coursesRoutes from "./coursesRoutes";
import loginRoutes from "./loginRoutes";
import logoutRoutes from "./logoutRoutes";
import adminRoutes from "./adminRoutes";

const routes = express.Router();

routes.use('/users',userRoutes);
routes.use('/lessons',lessonRoutes);
routes.use('/locations',locationRoutes);
routes.use('/courses',coursesRoutes);
routes.use('/login',loginRoutes);
routes.use('/admin',adminRoutes);
routes.use('/logout',checkIfAuthenticated, checkCsrfToken  ,logoutRoutes);



export { routes };