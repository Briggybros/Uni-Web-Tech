import { Router } from 'express';
import authApi from './auth';

const apiRouter = Router();

apiRouter.use('/auth', authApi);

export default apiRouter;
