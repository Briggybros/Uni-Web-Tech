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
                JSON.parse(data.meta).title,
                JSON.parse(data.content),
                author,
                data.published,
                JSON.parse(data.meta).timestamp,
                JSON.parse(data.meta),
            ));
    }

    title: string;
    author: User;
    timestamp: string;

    constructor(
        id: string,
        title: string,
        content: Object,
        author: User,
        published: boolean,
        timestamp: string,
        meta: Object,
    ) {
        super(id, content, published, { author: author.toJSON(), timestamp, ...meta });
        this.title = title;
        this.author = author;
        this.timestamp = timestamp;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            type: 'NEWS',
            title: this.title,
            author: this.author.toJSON(),
            timestamp: this.timestamp,
        };
    }
}
