// @flow
import { Router } from 'express';
import type { $Request, $Response } from 'express';

import Event from '../models/event';

const eventRouter = Router();

eventRouter.get('/:path', (req: $Request, res: $Response) => Event.getEvent(req.param.path).then((event) => {
    if (event) {
        res.status(200).send(event.toJSON());
    } else {
        res.sendStatus(404);
    }
}).catch((e) => {
    console.error(e);
    res.sendStatus(404);
}));

export default eventRouter;
