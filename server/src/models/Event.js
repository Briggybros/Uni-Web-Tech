// @flow
import database from '../database';
import type { ContentData } from '../database';

import DynamicContent from './DynamicContent';

export default class Event extends DynamicContent {
    static getEvent(id: string): Promise<Event> {
        return DynamicContent.getContent(id)
            .then(Event.fromRow);
    }

    static getEvents(
        limit: number | null,
        offset: number | null,
        drafts: boolean,
        past: boolean,
    ): Promise<Event[]> {
        const query = database.select()
            .from('dynamic_content')
            .where({
                type: 'EVENT',
            })
            .then(rows => rows.filter(row => (drafts ?
                true :
                row.published
            )))
            .then(rows => rows.filter(row => (past ?
                true :
                parseInt(JSON.parse(row.meta).timestamp, 10) > Date.now()
            )))
            .then(rows => rows.sort((a: ContentData, b: ContentData) => {
                const aTime = JSON.parse(a.meta).timestamp;
                const bTime = JSON.parse(b.meta).timestamp;
                if (aTime === '0') {
                    return -1;
                }
                return Number.parseInt(aTime, 10) - Number.parseInt(bTime, 10);
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
                Promise.all(rows.map(row => Event.fromRow(row))));
    }

    static fromRow(data: ContentData): Promise<Event> {
        return Promise.resolve(new Event(
            data.id,
            JSON.parse(data.content),
            data.published,
            JSON.parse(data.meta).timestamp,
            JSON.parse(data.meta).title,
            JSON.parse(data.meta),
        ));
    }

    static createEvent(title: string, content?: Object): Promise<Event> {
        return DynamicContent.createContent(content, false, 'EVENT', {
            title,
            timestamp: '0',
        }).then((row: ContentData) => Event.fromRow(row));
    }

    constructor(
        id: string,
        content: Object,
        published: boolean,
        timestamp: string,
        title: string,
        meta: Object,
    ) {
        super(id, content, published, 'EVENT', {
            ...meta,
            title,
            timestamp,
        });
    }

    set title(title: string) {
        this.meta = {
            ...this.meta,
            title,
        };
    }
    get title() { return this.meta.title; }

    set timestamp(timestamp: string) {
        this.meta = {
            ...this.meta,
            timestamp,
        };
    }
    get timestamp() { return this.meta.timestamp; }

    toJSON() {
        return {
            ...super.toJSON(),
            timestamp: this.timestamp,
            title: this.title,
        };
    }
}
