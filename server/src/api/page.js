// @flow
import { Router } from 'express';
import type { $Request, $Response } from 'express';

import * as Response from './responses';

import Page from '../models/StaticPage';

const pageRouter = Router();

pageRouter.get('/:path', (req: $Request, res: $Response) => Page.getPage(req.param.path).then((page) => {
    res.status(200).send(JSON.stringify({
        content: page.toJSON(),
        response: Response.Success.DATA_FOUND,
    }));
}).catch(() => {
    res.send(JSON.stringify({
        response: Response.ClientError.DATA_NOT_FOUND,
    }));
}));

export default pageRouter;
