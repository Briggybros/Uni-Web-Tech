// @flow
import Page from './page';
import User from './user';

export default class News extends Page {
    static create(path: string, content: Object, meta: Object): Promise<News | null> {
        return User.getUser(meta.author).then((author) => {
            if (author) {
                return new News(path, content, author, meta.timestamp, meta);
            }
            console.error(`News article ${path} has no author`);
            return null;
        });
    }

    author: User;
    timestamp: string;

    constructor(path: string, content: Object, author: User, timestamp: string, meta: Object) {
        super(path, content, { author: author.toJSON(), timestamp, ...meta });
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
