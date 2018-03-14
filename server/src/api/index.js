// @flow
import { Router } from 'express';
import authApi from './auth';
import newsApi from './news';
import eventApi from './event';

const apiRouter = Router();

apiRouter.use('/auth', authApi);
apiRouter.use('/news', newsApi);
apiRouter.use('/event', eventApi);

export default apiRouter;
