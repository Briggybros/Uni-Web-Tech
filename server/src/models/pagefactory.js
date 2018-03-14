// @flow
import database from '../database';
import type { PagesRow } from '../database';

import Page from './page';
import News from './news';
import Event from './event';

const pages: {[path: string]: Page | News | Event} = {};

function getPageRow(path: string): Promise<Array<PagesRow>> {
    return database.select().from('pages').where({
        path,
    });
}

export function getPage(path: string): Promise<Page | News | Event | null> {
    if (pages[path]) {
        return Promise.resolve(pages[path]);
    }
    return getPageRow(path).then((rows: Array<PagesRow>) => {
        if (rows.length === 0) {
            return null;
        } else if (rows.length > 1) {
            throw new Error(`Multiple pages with path: ${path}`);
        } else {
            const params = [
                rows[0].path,
                JSON.parse(rows[0].content),
                JSON.parse(rows[0].meta),
            ];

            let pagePromise;

            switch (rows[0].type) {
            case 'NEWS':
                pagePromise = News.create(...params);
                break;
            case 'EVENT':
                pagePromise = Event.create(...params);
                break;
            default:
                pagePromise = Page.create(...params);
                break;
            }

            return pagePromise.then((page) => {
                if (page) {
                    pages[path] = page;
                    return page;
                }
                throw new Error('Failed to get page');
            });
        }
    });
}

export const placeholder = '';
