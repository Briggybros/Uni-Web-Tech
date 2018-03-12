// @flow
import mysql from 'mysql';
import containerized from 'containerized';

export function connect() : Promise<mysql.Connection> {
    const connection = mysql.createConnection({
        host: process.env.DB_URL || (containerized() ? 'database' : 'localhost'),
        user: process.env.DB_USER || 'rag',
        password: process.env.DB_PASSWORD || 'rag',
        database: process.env.DB_DATABASE || 'rag',
    });

    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) return reject(err);
            return resolve(connection);
        });
    });
}

export function init() : Promise<any> {
    return connect().then(connection => new Promise((resolve, reject) => {
        connection.query('CREATE TABLE IF NOT EXISTS `users` (username VARCHAR(30) PRIMARY KEY, passowrd CHAR(60) BINARY)', (err1) => {
            if (err1) return reject(err1);
            return connection.query('CREATE TABLE IF NOT EXISTS `pages` (id VARCHAR(30) PRIMARY KEY, content LONGTEXT, meta LONGTEXT)', (err2) => {
                if (err2) return reject(err2);
                return resolve();
            });
        });
    }).then(() => {
        connection.end();
    }));
}


export function query(
    queryString : string,
    values? : Array<string>,
) : Promise<{results : Object, fields : Object}> {
    return connect.then(connection => new Promise((resolve, reject) => {
        connection.query(queryString, values, (err, results, fields) => {
            if (err) return reject(err);
            return resolve({ results, fields });
        });
    }).then((results) => {
        connection.end();
        return results;
    }));
}
