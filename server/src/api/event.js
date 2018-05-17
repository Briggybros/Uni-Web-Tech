// @flow
import { Router } from 'express';
import type { $Response } from 'express';

import type { Request as $Request } from './types';

import * as Response from './responses';

import Event from '../models/Event';

function isEditor(req: $Request, res: $Response, next: Function) {
    if (req.user.roles.includes('editor') || req.user.roles.includes('admin')) {
        return next();
    }
    return res.send(JSON.stringify({
        response: Response.ClientError.AUTH_FAILED,
    }));
}

const eventRouter = Router();

eventRouter.get('/', (req: $Request, res: $Response) => {
    const num: number | null =
        req.query.num ? parseInt(req.query.num, 10)
        || parseInt(req.query.num[0], 10) : null;
    const offset: number | null =
        req.query.offset ? parseInt(req.query.offset, 10)
        || parseInt(req.query.offset[0], 10) : null;
    const drafts: boolean = !!req.query.drafts;
    const past: boolean = !!req.query.past;
    return Event.getEvents(num, offset, drafts, past)
        .then(events => res.send(JSON.stringify({
            events: events.map(event => event.toJSON()),
            response: Response.Success.DATA_FOUND,
        })))
        .catch((error) => {
            console.error(error);
            return res.send(JSON.stringify({
                response: Response.ClientError.DATA_NOT_FOUND,
            }));
        });
});

eventRouter.post('/save/:id', isEditor, (req: $Request, res: $Response) => {
    if (req.params.id === 'new') {
        return Event.createEvent('New Event')
            .then(event => res.send(JSON.stringify({
                response: Response.Success.DATA_CREATED,
                article: event.toJSON(),
            })))
            .catch(console.error);
    }
    if (
        req.body &&
        typeof req.body === 'object' &&
        req.body.title &&
        typeof req.body.title === 'string' &&
        req.body.content &&
        typeof req.body.content === 'string'
    ) {
        const { title, content } = req.body;
        return Event.getEvent(req.params.id)
            .then((event) => {
                const newArticle = event;
                if (title !== event.title) {
                    newArticle.title = title;
                }
                if (content !== event.content) {
                    newArticle.content = JSON.parse(content);
                }
                return event.save();
            })
            .then(event => res.send(JSON.stringify({
                response: Response.Success.DATA_CREATED,
                article: event.toJSON(),
            })))
            .catch(console.error);
    }
    return res.send(JSON.stringify({
        response: Response.ClientError.BAD_BODY,
    }));
});

eventRouter.post('/publish/:id', isEditor, (req: $Request, res: $Response) => Event.getEvent(req.params.id)
    .then(event => event.publish())
    .then(event => res.send(JSON.stringify({
        response: Response.Success.DATA_CREATED,
        article: event.toJSON(),
    })))
    .catch(console.error));

export default eventRouter;
