// @flow
import knex from 'knex';
import containerized from 'containerized';

import { PromiseReduce } from './util';

export default function init() : Promise<knex> {
    const db = knex({
        client: 'mysql',
        connection: {
            host: containerized() ? 'database' : process.env.DB_URL || 'localhost',
            user: process.env.DB_USER || 'rag',
            password: process.env.DB_PASSWORD || 'rag',
            database: process.env.DB_DATABASE || 'rag',
        },
    });

    return new Promise((resolve, reject) => {
        resolve(PromiseReduce([
            db.schema.createTableIfNotExists('users', (table) => {
                table.increments('user_id').notNullable().unsigned().primary();
                table.string('email');
                table.string('name');
                table.string('password', 60);
            }),
            db.schema.createTableIfNotExists('roles', (table) => {
                table.increments('role_id').notNullable().unsigned().primary();
                table.string('name');
            }),
            db.schema.createTableIfNotExists('user_roles', (table) => {
                table.integer('user_id').unsigned().notNullable();
                table.integer('role_id').unsigned().notNullable();
                table.foreign('user_id').references('user_id').inTable('users');
                table.foreign('role_id').references('role_id').inTable('roles');
            }),
            db.schema.createTableIfNotExists('pages', (table) => {
                table.string('page_path').notNullable().primary();
                table.json('content').notNullable();
                table.json('meta');
            }),
        ]).catch(reject));
    }).then(() => db);
}
