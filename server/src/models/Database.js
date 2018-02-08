// @flow
import neo4j from 'neo4j';
import bcrypt from 'bcrypt';
import containerized from 'containerized';

import User from './User';

export default class Database {
    raw : neo4j.GraphDatabase

    constructor() {
        const USERNAME = process.env.DB_USER || 'neo4j';
        const PASSWORD = process.env.DB_PASS || 'password';
        const URL = containerized() ? 'ragneo4j' : (process.env.DB_URL || 'localhost');
        const PORT = process.env.DB_PORT || 7474;
        this.raw = new neo4j.GraphDatabase(`http://${USERNAME}:${PASSWORD}@${URL}:${PORT}`);
    }

    cypher(query : string, params : Object) : Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            this.raw.cypher({
                query,
                params,
            }, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }

    getUser(username : string) : Promise<User> {
        return this.cypher(
            'MATCH (u:User {username: {username}}) RETURN u',
            { username },
        ).then((results) => {
            const result = results[0];
            if (!result) {
                return null;
            }
            return new User(result.u);
        });
    }

    createUser(username : string, password : string) : Promise<User> {
        return bcrypt.hash(password, 10).then(hash => this.cypher(
            'CREATE (u:User {username: {username}, password: {password}}) RETURN u',
            {
                username,
                password: hash,
            },
        ).then(result => new User(result[0].u)));
    }
}
