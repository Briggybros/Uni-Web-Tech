// @flow
import { Router } from 'express';

import * as News from '../models/News';

const newsRouter = Router();

newsRouter.get('/:id', (req, res) => News.getArticle(req.param.id).then((article) => {
    res.status(200).send(JSON.stringify(article));
}).catch((e) => {
    console.error(e);
    res.sendStatus(404);
}));

export default newsRouter;
