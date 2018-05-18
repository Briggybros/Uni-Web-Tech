// @flow
import { Router } from 'express';
import type { $Response } from 'express';

import type { Request as $Request } from './types';
import * as Response from './responses';
import { isEditor } from './middleware';

import Article from '../models/Article';

const newsRouter = Router();

newsRouter.get('/', (req: $Request, res: $Response) => {
    const num: number | null =
        req.query.num ? parseInt(req.query.num, 10)
        || parseInt(req.query.num[0], 10) : null;
    const offset: number | null =
        req.query.offset ? parseInt(req.query.offset, 10)
        || parseInt(req.query.offset[0], 10) : null;
    const drafts: boolean = !!req.query.drafts;
    return Article.getArticles(num, offset, drafts)
        .then(articles => res.send(JSON.stringify({
            articles: articles.map(article => article.toJSON()),
            response: Response.Success.DATA_FOUND,
        })))
        .catch(error => res.send(JSON.stringify({
            response: {
                ...Response.ClientError.DATA_NOT_FOUND,
                raw: error,
            },
        })));
});

newsRouter.post('/save/:id', isEditor, (req: $Request, res: $Response) => {
    if (req.params.id === 'new') {
        return Article.createArticle('New Article', req.user)
            .then(article => res.send(JSON.stringify({
                response: Response.Success.DATA_CREATED,
                article: article.toJSON(),
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
        typeof req.body.content === 'string'
    ) {
        const { title, content } = req.body;
        return Article.getArticle(req.params.id)
            .then((article) => {
                const newArticle = article;
                if (title !== article.title) {
                    newArticle.title = title;
                }
                if (content !== article.content) {
                    newArticle.content = JSON.parse(content);
                }
                return newArticle.save();
            })
            .then(article => res.send(JSON.stringify({
                response: Response.Success.DATA_CREATED,
                article: article.toJSON(),
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

newsRouter.post('/publish/:id', isEditor, (req: $Request, res: $Response) => Article.getArticle(req.params.id)
    .then(article => article.publish())
    .then(article => res.send(JSON.stringify({
        response: Response.Success.DATA_CREATED,
        article: article.toJSON(),
    })))
    .catch(error => res.send(JSON.stringify({
        response: {
            ...Response.ServerError.DATA_CREATION_FAILED,
            raw: error,
        },
    }))));

export default newsRouter;
