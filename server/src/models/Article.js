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

    static getArticles(limit: number, offset: number): Promise<Article[]> {
        return database.select()
            .from('pages')
            .orderBy('timestamp', 'desc')
            .limit(limit)
            .offset(offset)
            .then((rows: ContentData[]) => Promise.all(rows.map(row => Article.fromRow(row))));
    }

    static fromRow(data: ContentData): Promise<Article> {
        return User.getUser(JSON.parse(data.meta).author)
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

    static createArticle(title: string, content: string, author: User): Article {
        const id = encodeURIComponent(title.toLowerCase().replace(' ', '-'));
        const article = new Article(id, title, content, author, false, '0', {});
        article.save();
        return article;
    }

    title: string;
    author: User;
    timestamp: string;

    constructor(
        id: string,
        title: string,
        content: string,
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
