// @flow
import { Router } from 'express';
import type { $Request, $Response } from 'express';

import * as Response from './responses';

import News from '../models/News';

const newsRouter = Router();

newsRouter.get('/', (req: $Request, res: $Response) => {
    const num: number = parseInt(req.query.num, 10) || parseInt(req.query.num[0], 10) || 10;
    const offset: number = parseInt(req.query.offset, 10) || parseInt(req.query.offset[0], 10) || 0;
    News.getArticles(num, offset).then((articles) => {
        res.send(JSON.stringify({
            content: articles.map(article => article.toJSON()),
            response: Response.Success.DATA_FOUND,
        }));
    }).catch(() => {
        res.send(JSON.stringify({
            response: Response.ClientError.DATA_NOT_FOUND,
        }));
    });
});

export default newsRouter;
