// @flow
import Page from './page';

export default class Event extends Page {
    static create(path: string, content: Object, meta: Object): Promise<Event | null> {
        return Promise.resolve(new Event(path, content, meta.datetime, meta.location, meta));
    }

    datetime: string;
    location: string;

    constructor(path: string, content: Object, datetime: string, location: string, meta: Object) {
        super(path, content, { datetime, location, ...meta });
        this.datetime = datetime;
        this.location = location;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            type: 'EVENT',
            datetime: this.datetime,
            location: this.location,
        };
    }
}
