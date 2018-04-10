// @flow
import { Router } from 'express';
import type { $Request, $Response } from 'express';

import News from '../models/News';

const newsRouter = Router();

newsRouter.get('/', (req: $Request, res: $Response) => {
    const num = req.query.num || 10;
    const offset = req.query.offset || 0;
    News.getArticles(num, offset).then((articles) => {
        res.send(JSON.stringify({
            content: articles.map(article => article.toJSON()),
        }));
    }).catch((error) => {
        console.error(error);
        res.send(JSON.stringify({
            error: error.message,
        }));
    });
});

export default newsRouter;
