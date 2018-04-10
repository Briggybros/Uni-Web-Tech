// @flow
import { Router } from 'express';
import type { $Request, $Response } from 'express';

import Page from '../models/StaticPage';

const pageRouter = Router();

pageRouter.get('/:path', (req: $Request, res: $Response) => Page.getPage(req.param.path).then((page) => {
    res.status(200).send(JSON.stringify({
        content: page.toJSON(),
    }));
}).catch((error) => {
    console.error(error);
    res.send(JSON.stringify({
        error: error.message,
    }));
}));

export default pageRouter;
