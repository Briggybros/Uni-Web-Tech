// @flow
import { Router } from 'express';
import type { $Response } from 'express';

import type { Request as $Request } from './types';
import * as Response from './responses';
import { isEditor } from './middleware';

import Page from '../models/Page';

const pageRouter = Router();

pageRouter.get('/', (req: $Request, res: $Response) => {
    const drafts: boolean = !!req.query.drafts;
    return Page.getPages(drafts)
        .then(pages => res.send(JSON.stringify({
            pages: pages.map(page => page.toJSON()),
            response: Response.Success.DATA_FOUND,
        })))
        .catch(error => res.send(JSON.stringify({
            response: {
                ...Response.ClientError.DATA_NOT_FOUND,
                raw: error,
            },
        })));
});

pageRouter.post('/save/:id', isEditor, (req: $Request, res: $Response) => {
    if (req.params.id === 'new') {
        return Page.createPage('New Page')
            .then(page => res.send(JSON.stringify({
                page: page.toJSON(),
                response: Response.Success.DATA_CREATED,
            })))
            .catch(error => res.send(JSON.stringify({
                response: {
                    ...Response.ServerError.DATA_CREATION_FAILED,
                    raw: error,
                },
            })));
    }
    if (
        req.body &&
        typeof req.body === 'object' &&
        req.body.title &&
        typeof req.body.title === 'string' &&
        req.body.content &&
        typeof req.body.content === 'string' &&
        req.body.inNav !== undefined &&
        typeof req.body.inNav === 'boolean' &&
        req.body.url &&
        typeof req.body.url === 'string'
    ) {
        const {
            title,
            content,
            inNav,
            url,
        } = req.body;
        return Page.getPage(req.params.id)
            .then((page) => {
                const newPage = page;
                if (title !== page.title) {
                    newPage.title = title;
                }
                if (content !== page.content) {
                    newPage.content = JSON.parse(content);
                }
                if (inNav !== page.inNav) {
                    newPage.inNav = inNav;
                }
                if (url !== page.url) {
                    newPage.url = url;
                }
                return newPage.save();
            })
            .then(page => res.send(JSON.stringify({
                response: Response.Success.DATA_CREATED,
                page: page.toJSON(),
            })))
            .catch(error => res.send(JSON.stringify({
                response: {
                    ...Response.ServerError.DATA_CREATION_FAILED,
                    raw: error,
                },
            })));
    }
    return res.send(JSON.stringify({
        response: Response.ClientError.BAD_BODY,
    }));
});

pageRouter.post('/publish/:id', isEditor, (req: $Request, res: $Response) => Page.getPage(req.params.id)
    .then(page => page.publish())
    .then(page => res.send(JSON.stringify({
        response: Response.Success.DATA_CREATED,
        page: page.toJSON(),
    })))
    .catch(error => res.send(JSON.stringify({
        response: {
            ...Response.ServerError.DATA_CREATION_FAILED,
            raw: error,
        },
    }))));

export default pageRouter;
