// @flow
import database from '../database';
import type { ContentData, TypeType } from '../database';

export default class DynamicContent {
    static defaultContent = {
        document: {
            nodes: [
                {
                    object: 'block',
                    type: 'LEFT_ALIGN_NODE',
                    nodes: [
                        {
                            object: 'text',
                            leaves: [
                                {
                                    text: '',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    };

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

    static createContent(
        content?: Object,
        published: boolean,
        type: string,
        meta: Object,
    ): Promise<ContentData> {
        return database('dynamic_content').insert({
            content: JSON.stringify(content || DynamicContent.defaultContent),
            published,
            type,
            meta: JSON.stringify(meta),
        }).then(([id]) => database.select().from('dynamic_content').where({
            id,
        })).then(rows => rows[0]);
    }

    id: string;
    content: Object;
    published: boolean;
    type: TypeType;
    meta: Object;

    constructor(id: string, content: Object, published: boolean, type: TypeType, meta: Object) {
        this.id = id;
        this.content = content;
        this.published = published;
        this.type = type;
        this.meta = meta;
    }

    save = (() => database.select('id').from('dynamic_content').where({
        id: this.id,
    })
        .then((rows: ContentData[]) => {
            if (rows.length > 1) {
                throw new Error(`Multiple content with id: ${this.id}`);
            } else if (rows.length === 0) {
                throw new Error(`No content with id: ${this.id}`);
            } else {
                return database('dynamic_content').update(this.toContentData()).where({
                    id: this.id,
                });
            }
        })
        .then(() => this));

    publish() {
        return database('dynamic_content').update({
            published: true,
        }).where({
            id: this.id,
        })
            .then(() => {
                this.published = true;
            })
            .then(() => this);
    }

    toContentData(): ContentData {
        return {
            id: this.id,
            content: JSON.stringify(this.content),
            published: this.published,
            type: this.type,
            meta: JSON.stringify(this.meta),
        };
    }

    toJSON(): Object {
        return this.toContentData();
    }
}
