// @flow
import sqlite from 'sqlite';

const dbPromise = sqlite.open('./database.sqlite', { Promise });

const requiredTables = [
    'users',
    'roles',
    'posts',
    'events',
    'pages',
];

export async function integrityCheck() : Promise<boolean> {
    const db = await dbPromise;
    const tables = await db.all('SELECT name FROM sqlite_master WHERE type=\'table\';');
    return requiredTables.every(table => tables.indexOf(table) !== -1);
}

export async function createTables() : Promise<void> {
    const db = await dbPromise;
    await db.exec(`
        CREATE TABLE users (username VARCHAR(100), password CHAR(60) BINARY, imgURL VARCHAR(100));
    `);
}

export async function init() : Promise<void> {
    const integral = await integrityCheck();
    if (!integral) {
        await createTables();
    }
}

export async function close() {
    (await dbPromise).close();
}
