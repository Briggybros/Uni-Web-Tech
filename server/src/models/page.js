// @flow
export default class Page {
    static create(path: string, content: Object, meta: Object): Promise<Page | null> {
        return Promise.resolve(new Page(path, content, meta));
    }

    path: string;
    content: Object;
    meta: Object;

    constructor(path: string, content: Object, meta: Object) {
        this.path = path;
        this.content = content;
        this.meta = meta;
    }

    toJSON(): Object {
        return {
            path: this.path,
            content: this.content,
            meta: this.meta,
        };
    }
}
