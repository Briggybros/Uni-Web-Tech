// @flow
import DynamicContent from './DynamicContent';

export default class Event extends DynamicContent {
    datetime: string;
    location: string;

    constructor(
        path: string,
        content: string,
        published: boolean,
        datetime: string,
        location: string,
        meta: Object,
    ) {
        super(path, content, published, 'EVENT', { datetime, location, ...meta });
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
