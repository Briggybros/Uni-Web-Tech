// @flow
import database from '../database';
import type { PagesRow } from '../database';

import News from './news';
import Event from './event';

export default class Page {
    static pages: {[path: string]: Page | News | Event} = {}

    static getPageRow(path: string): Promise<Array<PagesRow>> {
        return database.select().from('pages').where({
            path,
        });
    }

    static getPage(path: string): Promise<Page | News | Event | null> {
        if (Page.pages[path]) {
            return Promise.resolve(Page.pages[path]);
        }
        return Page.getPageRow(path).then((rows: Array<PagesRow>) => {
            if (rows.length === 0) {
                return null;
            } else if (rows.length > 1) {
                throw new Error(`Multiple pages with path: ${path}`);
            } else {
                const params = [
                    rows[0].path,
                    JSON.parse(rows[0].content),
                    JSON.parse(rows[0].meta),
                ];

                switch (rows[0].type) {
                case 'NEWS':
                    return News.create(...params);
                case 'EVENT':
                    return Event.create(...params);
                default:
                    return new Page(...params);
                }
            }
        });
    }

    path: string;
    content: Object;
    meta: Object;

    constructor(path: string, content: Object, meta: Object) {
        this.path = path;
        this.content = content;
        this.meta = meta;
        Page.pages[path] = this;
    }

    toJSON(): Object {
        return {
            path: this.path,
            content: this.content,
            meta: this.meta,
        };
    }
}
