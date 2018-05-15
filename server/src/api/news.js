// @flow
import { Router } from 'express';
import type { $Response } from 'express';

import type { Request as $Request } from './types';

import * as Response from './responses';

import Article from '../models/Article';

function isEditor(req: $Request, res: $Response, next: Function) {
    if (req.user.roles.includes('editor') || req.user.roles.includes('admin')) {
        return next();
    }
    return res.send(JSON.stringify({
        response: Response.ClientError.AUTH_FAILED,
    }));
}

const newsRouter = Router();

newsRouter.get('/', (req: $Request, res: $Response) => {
    const num: number = parseInt(req.query.num, 10) || parseInt(req.query.num[0], 10) || 10;
    const offset: number = parseInt(req.query.offset, 10) || parseInt(req.query.offset[0], 10) || 0;
    return Article.getArticles(num, offset)
        .then(articles => res.send(JSON.stringify({
            content: articles.map(article => article.toJSON()),
            response: Response.Success.DATA_FOUND,
        })))
        .catch(() => res.send(JSON.stringify({
            response: Response.ClientError.DATA_NOT_FOUND,
        })));
});

newsRouter.post('/save/:id', isEditor, (req: $Request, res: $Response) => {
    if (
        req.body &&
        typeof req.body === 'object' &&
        req.body.title &&
        typeof req.body.title === 'string' &&
        req.body.content &&
        typeof req.body.content === 'string'
    ) {
        const { title, content } = req.body;
        if (req.params.id === 'new') {
            return Article.createArticle(title, content, req.user)
                .then(article => res.send(JSON.stringify({
                    response: Response.Success.DATA_CREATED,
                    article: article.toJSON(),
                })))
                .catch(console.error);
        }
        return Article.getArticle(req.params.id)
            .then((article) => {
                const newArticle = article;
                if (title !== article.title) {
                    newArticle.title = title;
                }
                if (content !== article.content) {
                    newArticle.content = content;
                }
                return article.save();
            })
            .then(article => res.send(JSON.stringify({
                response: Response.Success.DATA_CREATED,
                article: article.toJSON(),
            })))
            .catch(console.error);
    }
    return res.send(JSON.stringify({
        response: Response.ClientError.BAD_BODY,
    }));
});

export default newsRouter;
