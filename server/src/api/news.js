// @flow
import { Router } from 'express';
import type { $Request, $Response } from 'express';

import News from '../models/news';

const newsRouter = Router();

newsRouter.get('/:path', (req: $Request, res: $Response) => News.getArticle(req.param.path).then((article) => {
    if (article) {
        res.status(200).send(article.toJSON());
    } else {
        res.sendStatus(404);
    }
}).catch((e) => {
    console.error(e);
    res.sendStatus(404);
}));

export default newsRouter;
