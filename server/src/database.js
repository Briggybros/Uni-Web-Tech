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

export type UserRow = {
    username: string,
    email: string,
    password: string,
};

export type RolesRow = {
    id: number,
    name: string,
};

export type UserRolesRow = {
    username: string,
    role_id: number,
};

export type PagesRow = {
    path: string,
    content: string,
    type: 'NEWS' | 'EVENT' | null,
    meta: string,
}

export default db;

export function init(): Promise<Knex$Knex<*>> {
    return new Promise((resolve, reject) => {
        resolve(PromiseReduce([
            db.schema.hasTable('users').then((exists) => {
                if (!exists) {
                    return db.schema.createTable('users', (table) => {
                        table.string('username').notNullable().primary();
                        table.string('email');
                        table.string('password', 60);
                    });
                }
                return null;
            }),
            db.schema.hasTable('roles').then((exists) => {
                if (!exists) {
                    return db.schema.createTable('roles', (table) => {
                        table.increments('id').notNullable().unsigned().primary();
                        table.string('name');
                    });
                }
                return null;
            }),
            db.schema.hasTable('user_roles').then((exists) => {
                if (!exists) {
                    return db.schema.createTable('user_roles', (table) => {
                        table.string('username').notNullable();
                        table.integer('role_id').unsigned().notNullable();
                        table.foreign('username').references('username').inTable('users');
                        table.foreign('role_id').references('id').inTable('roles');
                    });
                }
                return null;
            }),
            db.schema.hasTable('pages').then((exists) => {
                if (!exists) {
                    return db.schema.createTable('pages', (table) => {
                        table.string('path').notNullable().primary();
                        table.json('content').notNullable();
                        table.enu('type', ['NEWS', 'EVENT']);
                        table.json('meta');
                    });
                }
                return null;
            }),
        ]).catch(reject));
    }).then(() => db);
}
