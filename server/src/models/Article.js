// @flow
import database from '../database';
import type { ContentData } from '../database';

import DynamicContent from './DynamicContent';
import User from './User';

export default class Article extends DynamicContent {
    static getArticle(id: string): Promise<Article> {
        return DynamicContent.getContent(id)
            .then(Article.fromRow);
    }

    static getArticles(
        limit: number | null,
        offset: number | null,
        published: boolean,
    ): Promise<Article[]> {
        const query = database.select()
            .from('dynamic_content')
            .where({
                type: 'NEWS',
            })
            .then(rows => rows.filter(row => (published ? row.published : true)))
            .then(rows => rows.sort((a: ContentData, b: ContentData) => {
                const aTime = JSON.parse(a.meta).timestamp;
                const bTime = JSON.parse(b.meta).timestamp;
                if (aTime === '0') {
                    return -1;
                }
                return Number.parseInt(bTime, 10) - Number.parseInt(aTime, 10);
            }));

        if (offset !== null) {
            query.then((rows) => {
                if (offset !== null) rows.splice(0, offset);
                return rows;
            });
        }
        if (limit !== null) {
            query.then((rows) => {
                if (limit !== null) rows.splice(limit, rows.length - limit);
                return rows;
            });
        }
        return query
            .then((rows: ContentData[]) =>
                Promise.all(rows.map(row => Article.fromRow(row))));
    }

    static fromRow(data: ContentData): Promise<Article> {
        return User.getUser(JSON.parse(data.meta).author.email)
            .then(author => new Article(
                data.id,
                JSON.parse(data.meta).title,
                JSON.parse(data.content),
                author,
                data.published,
                JSON.parse(data.meta).timestamp,
                JSON.parse(data.meta),
            ));
    }

    static createArticle(title: string, content: Object, author: User): Promise<Article> {
        return DynamicContent.createContent(content, false, 'NEWS', {
            title,
            author: author.toJSON(),
            timestamp: '0',
        }).then((row: ContentData) => Article.fromRow(row));
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
        super(id, content, published, 'NEWS', {
            ...meta,
            title,
            author: author.toJSON(),
            timestamp,
        });
        this.title = title;
        this.author = author;
        this.timestamp = timestamp;
    }

    set title(title: string) {
        this.title = title;
        this.meta = {
            ...this.meta,
            title,
        };
    }
    get title() { return this.title; }

    set author(author: User) {
        this.author = author;
        this.meta = {
            ...this.meta,
            author: author.toJSON(),
        };
    }
    get author() { return this.author; }

    set timestamp(timestamp: string) {
        this.timestamp = timestamp;
        this.meta = {
            ...this.meta,
            timestamp,
        };
    }
    get timestamp() { return this.timestamp; }

    publish() {
        super.publish().then(() => {
            this.timestamp = Date.now().toString();
            return this.save();
        });
    }

    toContentData(): ContentData {
        return {
            ...super.toContentData(),
            type: 'NEWS',
        };
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
