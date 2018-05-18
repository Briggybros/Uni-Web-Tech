// @flow
import knex from 'knex';
import containerized from 'containerized';

import { PromiseReduce } from './util';

const db = knex({
    client: 'mysql',
    connection: {
        host: containerized() ? 'database' : process.env.DB_URL || 'localhost',
        user: process.env.DB_USER || 'rag',
        password: process.env.DB_PASSWORD || 'rag',
        database: process.env.DB_DATABASE || 'rag',
    },
});

export type UserData = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    verified: boolean,
};

export type UserRolesData = {
    email: string,
    role: string,
};

export type TypeType = 'NEWS' | 'EVENT' | 'PAGE';

export type ContentData = {
    id: string,
    content: string,
    published: boolean,
    type: TypeType,
    meta: string,
}

export default db;

export function init(): Promise<Knex$Knex<*>> {
    return new Promise((resolve, reject) => PromiseReduce([
        () => db.schema.hasTable('users').then((exists) => {
            if (!exists) {
                return db.schema.createTable('users', (table) => {
                    table.string('email').notNullable().primary();
                    table.string('password', 60).notNullable();
                    table.string('firstName').notNullable();
                    table.string('lastName').notNullable();
                    table.boolean('verified').notNullable();
                })
                    .then(() => console.log('users table created'))
                    .catch(console.error);
            }
            return null;
        }),
        () => db.schema.hasTable('user_roles').then((exists) => {
            if (!exists) {
                return db.schema.createTable('user_roles', (table) => {
                    table.string('email').notNullable();
                    table.string('role').notNullable();
                    table.foreign('email').references('email').inTable('users');
                })
                    .then(() => console.log('user_roles table created'))
                    .catch(console.error);
            }
            return null;
        }),
        () => db.schema.hasTable('dynamic_content').then((exists) => {
            if (!exists) {
                return db.schema.createTable('dynamic_content', (table) => {
                    table.increments('id');
                    table.json('content').notNullable();
                    table.boolean('published').notNullable();
                    table.enu('type', ['NEWS', 'EVENT', 'PAGE']);
                    table.json('meta');
                })
                    .then(() => console.log('dynamic_content table created'))
                    .catch(console.error);
            }
            return null;
        }),
    ])
        .then(resolve)
        .catch(reject)).then(() => db);
}
