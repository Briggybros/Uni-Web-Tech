// @flow
import database from '../database';
import type { ContentData } from '../database';

export default class DynamicContent {
    static getContent(id: string): Promise<ContentData> {
        return database.select().from('dynamic_content').where({
            id,
        }).then((rows: ContentData[]) => {
            if (rows.length === 0) {
                throw new Error(`No content with id: ${id}`);
            } else if (rows.length > 1) {
                throw new Error(`Multiple content with id: ${id}`);
            } else {
                return rows[0];
            }
        });
    }

    id: string;
    content: string;
    published: boolean;
    type: string;
    meta: Object;

    constructor(id: string, content: string, published: boolean, type: string, meta: Object) {
        this.id = id;
        this.content = content;
        this.published = published;
        this.meta = meta;
    }

    save() {
        return database.select('id').from('dynamic_content').where({
            id: this.id,
        })
            .then((rows: ContentData[]) => {
                if (rows.length > 1) {
                    throw new Error(`Multiple content with id: ${this.id}`);
                } else if (rows.length === 0) {
                    return database('dynamic_content').insert(this.toJSON());
                } else {
                    return database('dynamic_content').update(this.toJSON()).where({
                        id: this.id,
                    });
                }
            })
            .then(() => this);
    }

    publish() {
        return database('dynamic_content').update({
            published: true,
        }).where({
            id: this.id,
        }).then(() => {
            this.published = true;
        });
    }

    toJSON(): Object {
        return {
            id: this.id,
            content: this.content,
            published: this.published,
            type: this.type,
            meta: this.meta,
        };
    }
}
