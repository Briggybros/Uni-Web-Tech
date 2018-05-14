// @flow
import database from '../database';
import type { ContentData } from '../database';

export default class DynamicContent {
    static content: {[id: string]: ContentData} = {};

    static getContent(id: string): Promise<ContentData> {
        if (DynamicContent.content[id]) {
            return Promise.resolve(DynamicContent.content[id]);
        }
        return database.select().from('pages').where({
            id,
        }).then((rows: ContentData[]) => {
            if (rows.length === 0) {
                throw new Error(`No page with id: ${id}`);
            } else if (rows.length > 1) {
                throw new Error(`Multiple pages with id: ${id}`);
            } else {
                return rows[0];
            }
        });
    }

    id: string;
    content: Object;
    published: boolean;
    meta: Object;

    constructor(id: string, content: Object, published: boolean, meta: Object) {
        this.id = id;
        this.content = content;
        this.published = published;
        this.meta = meta;
    }

    toJSON(): Object {
        return {
            id: this.id,
            content: this.content,
            published: this.published,
            meta: this.meta,
        };
    }
}
