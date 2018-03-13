// @flow
import Page from './page';
import User from './user';

import type { PagesRow } from '../database';

export default class News extends Page {
    static getArticle(path: string): Promise<News | null> {
        return Page.getPageRow(path).then((rows: Array<PagesRow>) => {
            if (rows.length === 0) {
                return null;
            } else if (rows.length > 1) {
                throw new Error(`Multiple articles with path: ${path}`);
            } else {
                const meta = JSON.parse(rows[0].meta);
                return User.getUser(meta.author).then((user) => {
                    if (user) {
                        return new News(
                            rows[0].path,
                            JSON.parse(rows[0].content),
                            user,
                            meta.timestamp,
                            meta,
                        );
                    }
                    throw new Error(`Missing author of article: ${path}`);
                });
            }
        });
    }

    constructor(path: string, content: Object, author: User, timestamp: string, meta: Object) {
        super(path, content, { author, timestamp, ...meta });
    }
}
