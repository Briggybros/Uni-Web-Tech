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

export type RolesData = {
    id: number,
    name: string,
};

export type UserRolesData = {
    email: string,
    role_id: number,
};

export type ContentData = {
    id: string,
    content: string,
    type: 'NEWS' | 'EVENT' | null,
    timestamp: string,
    meta: string,
}

export default db;

export function init(): Promise<knex> {
    return new Promise((resolve, reject) => {
        resolve(PromiseReduce([
            db.schema.hasTable('users').then((exists) => {
                if (!exists) {
                    return db.schema.createTable('users', (table) => {
                        table.string('email').notNullable().primary();
                        table.string('password', 60);
                        table.string('firstName');
                        table.string('lastName');
                        table.boolean('verified');
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
                        table.foreign('email').references('email').inTable('users');
                        table.foreign('role_id').references('id').inTable('roles');
                    });
                }
                return null;
            }),
            db.schema.hasTable('dynamic_content').then((exists) => {
                if (!exists) {
                    return db.schema.createTable('dynamic_content', (table) => {
                        table.string('id').notNullable().primary();
                        table.json('content').notNullable();
                        table.timestamp('timestamp').notNullable();
                        table.enu('type', ['NEWS', 'EVENT']);
                        table.json('meta');
                    });
                }
                return null;
            }),
        ]).catch(reject));
    }).then(() => db);
}
