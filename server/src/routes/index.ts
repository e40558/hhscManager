
import * as express from 'express';
import { checkIfAuthenticated } from '../middleware/authentication.middleware';
import { checkCsrfToken } from '../middleware/csrf.middleware';

import userRoutes from "./userRoutes";
import lessonsRoutes from "./lessonsRoutes";
import locationsRoutes from "./locationsRoutes";
import consumersRoutes from "./consumersRoutes";
import coursesRoutes from "./coursesRoutes";
import loginRoutes from "./loginRoutes";
import logoutRoutes from "./logoutRoutes";
import adminRoutes from "./adminRoutes";

const routes = express.Router();

routes.use('/users',userRoutes);
routes.use('/lessons',lessonsRoutes);
routes.use('/locations',locationsRoutes);
routes.use('/courses',coursesRoutes);

routes.use('/consumers',consumersRoutes);
routes.use('/login',loginRoutes);
routes.use('/admin',adminRoutes);
routes.use('/logout',checkIfAuthenticated, checkCsrfToken  ,logoutRoutes);



export { routes };