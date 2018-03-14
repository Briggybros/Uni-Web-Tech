// @flow
import { Router } from 'express';
import type { $Request, $Response } from 'express';

import * as PageFactory from '../models/pagefactory';

const pageRouter = Router();

pageRouter.get('/:path', (req: $Request, res: $Response) => PageFactory.getPage(req.param.path).then((page) => {
    if (page) {
        res.status(200).send(page.toJSON());
    } else {
        res.sendStatus(404);
    }
}).catch((e) => {
    console.error(e);
    res.sendStatus(500);
}));

export default pageRouter;
