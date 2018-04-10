// @flow
import database from '../database';
import type { ContentData } from '../database';

export default class DynamicContent {
    static content: {[id: string]: ContentData}

    static getContent(id: string): Promise<ContentData> {
        if (DynamicContent.content[id]) {
            return Promise.resolve(DynamicContent.content[id]);
        }
        return database.select().from('pages').where({
            id,
        }).then((rows: ContentData[]) => {
            if (rows.length === 0) {
                return null;
            } else if (rows.length > 1) {
                throw new Error(`Multiple pages with id: ${id}`);
            } else {
                return {
                    id: rows[0].id,
                    content: rows[0].content,
                    type: rows[0].type,
                    meta: rows[0].meta,
                };
            }
        });
    }

    id: string;
    content: Object;
    meta: Object;

    constructor(id: string, content: Object, meta: Object) {
        this.id = id;
        this.content = content;
        this.meta = meta;
    }

    toJSON(): Object {
        return {
            id: this.id,
            content: this.content,
            meta: this.meta,
        };
    }
}
