// @flow
import { Router } from 'express';
import authApi from './auth';
import newsApi from './news';

const apiRouter = Router();

apiRouter.use('/auth', authApi);
apiRouter.use('/news', newsApi);

export default apiRouter;
