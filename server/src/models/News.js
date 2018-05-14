// @flow
import database from '../database';
import type { ContentData } from '../database';

import DynamicContent from './DynamicContent';
import User from './User';

export default class News extends DynamicContent {
    static getArticle(id: string): Promise<News> {
        return DynamicContent.getContent(id)
            .then(News.createNews);
    }

    static getArticles(limit: number, offset: number): Promise<News[]> {
        return database.select()
            .from('pages')
            .orderBy('timestamp', 'desc')
            .limit(limit)
            .offset(offset)
            .then((rows: ContentData[]) => Promise.all(rows.map(row => News.createNews(row))));
    }

    static createNews(data: ContentData): Promise<News> {
        return User.getUser(JSON.parse(data.meta).author)
            .then(author => new News(
                data.id,
                JSON.parse(data.content),
                author,
                data.timestamp,
                JSON.parse(data.meta),
            ));
    }

    author: User;
    timestamp: string;

    constructor(id: string, content: Object, author: User, timestamp: string, meta: Object) {
        super(id, content, { author: author.toJSON(), timestamp, ...meta });
        this.author = author;
        this.timestamp = timestamp;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            type: 'NEWS',
            author: this.author.toJSON(),
            timestamp: this.timestamp,
        };
    }
}
