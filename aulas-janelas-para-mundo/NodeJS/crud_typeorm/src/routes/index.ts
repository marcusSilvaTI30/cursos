import { Router } from 'express';
import classRoutes from './class.routes';
import userRoutes from './users.routes';

const routes = Router();

routes.use(classRoutes);
routes.use(userRoutes);

export default routes;
