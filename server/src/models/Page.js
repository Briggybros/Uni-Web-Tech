import * as Database from './Database';

export function getPage(id : string) : Promise<Object | null> {
    return Database.query('SELECT * FROM `pages` WHERE `id`=?', [id]).then((result) => {
        if (!result.results[0]) return null;
        return {
            id,
            content: JSON.parse(result.results[0].content),
            meta: JSON.parse(result.results[0].meta),
        };
    });
}

export function createPage(id : string, content : Object, meta : Object) {
    return Database.query('INSERT INTO `pages` (id, content, meta) VALUES (?, ?, ?)', [id, JSON.stringify(content), JSON.stringify(meta)]);
}
