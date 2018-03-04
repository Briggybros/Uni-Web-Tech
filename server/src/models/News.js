// @flow
import * as Page from './Page';

export function getArticle(id : string) : Promise<Object> {
    return Page.getPage(id).then(page => ({
        content: page.content,
        author: page.meta.author,
        timestamp: page.meta.timestamp,
    }));
}

export function createArticle(
    id : string,
    content : Object,
    author : string,
    timestamp : string,
) : Promise<any> {
    return Page.createPage(id, content, { author, timestamp, type: 'article' });
}
