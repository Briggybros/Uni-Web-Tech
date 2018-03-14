// @flow
import Page from './page';

import type { PagesRow } from '../database';

export default class Event extends Page {
    static getEvent(path: string): Promise<Event | null> {
        return Page.getPageRow(path).then((rows: Array<PagesRow>) => {
            if (rows.length === 0) {
                return null;
            } else if (rows.length > 1) {
                throw new Error(`Multiple events with path: ${path}`);
            } else {
                const meta = JSON.parse(rows[0].meta);
                return new Event(
                    rows[0].path,
                    JSON.parse(rows[0].content),
                    meta.time,
                    meta.location,
                    meta,
                );
            }
        });
    }

    time: string;
    location: string;

    constructor(path: string, content: Object, time: string, location: string, meta: Object) {
        super(path, content, { time, location, ...meta });
        this.time = time;
        this.location = location;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            time: this.time,
            location: this.location,
        };
    }
}
