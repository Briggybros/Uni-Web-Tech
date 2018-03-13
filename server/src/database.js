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
    meta: string,
}

export default db;

export function init(): Promise<knex> {
    return new Promise((resolve, reject) => {
        resolve(PromiseReduce([
            db.schema.createTableIfNotExists('users', (table) => {
                table.string('username').notNullable().primary();
                table.string('email');
                table.string('password', 60);
            }),
            db.schema.createTableIfNotExists('roles', (table) => {
                table.increments('id').notNullable().unsigned().primary();
                table.string('name');
            }),
            db.schema.createTableIfNotExists('user_roles', (table) => {
                table.string('username').notNullable();
                table.integer('role_id').unsigned().notNullable();
                table.foreign('username').references('username').inTable('users');
                table.foreign('role_id').references('id').inTable('roles');
            }),
            db.schema.createTableIfNotExists('pages', (table) => {
                table.string('path').notNullable().primary();
                table.json('content').notNullable();
                table.json('meta');
            }),
        ]).catch(reject));
    }).then(() => db);
}
