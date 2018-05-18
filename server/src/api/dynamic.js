// @flow
import { Router } from 'express';
import type { $Request, $Response } from 'express';

import * as Response from './responses';

import DynamicContent from '../models/DynamicContent';
import Article from '../models/Article';
import Event from '../models/Event';
import Page from '../models/Page';

const dynamicRouter = Router();

dynamicRouter.get('/:id', (req: $Request, res: $Response) => {
    DynamicContent.getContent(req.params.id).then((row) => {
        switch (row.type) {
        case 'NEWS':
            return Article.fromRow(row);
        case 'EVENT':
            return Event.fromRow(row);
        case 'PAGE':
            return Page.fromRow(row);
        default: throw new Error('Unrecognised content type');
        }
    }).then(item => res.send(JSON.stringify({
        item,
        response: Response.Success.DATA_FOUND,
    }))).catch(error => res.send(JSON.stringify({
        response: {
            ...Response.ClientError.DATA_NOT_FOUND,
            raw: error,
        },
    })));
});

export default dynamicRouter;
