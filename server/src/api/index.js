// @flow
import { Router } from 'express';
import authApi from './auth';
import pageApi from './page';
import newsApi from './news';
import eventApi from './event';
import dynamicApi from './dynamic';

const apiRouter = Router();

apiRouter.use('/page', pageApi);
apiRouter.use('/auth', authApi);
apiRouter.use('/news', newsApi);
apiRouter.use('/event', eventApi);
apiRouter.use('/dynamic', dynamicApi);

export default apiRouter;
