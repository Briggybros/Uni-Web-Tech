// @flow
import { Router } from 'express';
import type { $Request, $Response } from 'express';

import News from '../models/news';

const newsRouter = Router();

newsRouter.get('/', (req: $Request, res: $Response) => {
    const num = req.query.num || 10;
    const offset = req.query.offset || 0;
    News.getArticles(num, offset).then((articles) => {
        res.send(articles.map(article => article.toJSON()));
    });
});

export default newsRouter;
