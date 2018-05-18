// @flow
import database from '../database';
import type { ContentData } from '../database';

import DynamicContent from './DynamicContent';

export default class Page extends DynamicContent {
    static getPage(id: string): Promise<Page> {
        return DynamicContent.getContent(id)
            .then(Page.fromRow);
    }

    static getPages(drafts: boolean): Promise<Page[]> {
        return database.select()
            .from('dynamic_content')
            .where({
                type: 'PAGE',
            })
            .then(rows => rows.filter(row => (drafts ? true : row.published)))
            .then((rows: ContentData[]) =>
                Promise.all(rows.map(row => Page.fromRow(row))));
    }

    static fromRow(data: ContentData): Promise<Page> {
        return Promise.resolve(new Page(
            data.id,
            JSON.parse(data.content),
            data.published,
            JSON.parse(data.meta).url,
            JSON.parse(data.meta).inNav,
            JSON.parse(data.meta).title,
            JSON.parse(data.meta),
        ));
    }

    static createPage(title: string, content?: Object): Promise<Page> {
        return DynamicContent.createContent(content, false, 'PAGE', {
            title,
            inNav: false,
        }).then((row: ContentData) => Page.fromRow(row));
    }

    constructor(
        id: string,
        content: Object,
        published: boolean,
        url: string,
        inNav: boolean,
        title: string,
        meta: Object,
    ) {
        super(id, content, published, 'PAGE', {
            ...meta,
            url,
            inNav,
            title,
        });
    }

    set url(url: string) {
        this.meta = {
            ...this.meta,
            url,
        };
    }
    get url() { return this.meta.url; }

    set inNav(inNav: boolean) {
        this.meta = {
            ...this.meta,
            inNav,
        };
    }
    get inNav() { return this.meta.inNav; }

    set title(title: string) {
        this.meta = {
            ...this.meta,
            title,
        };
    }
    get title() { return this.meta.title; }

    toJSON() {
        return {
            ...super.toJSON(),
            url: this.url,
            inNav: this.inNav,
            title: this.title,
        };
    }
}
