// @flow
import bcrypt from 'bcrypt';
import { cypher } from './Database';

const users : Object = {};

export default class User {
    static getUser(username : string) : Promise<User | null> {
        if (users[username]) return Promise.resolve(users[username]);
        return cypher(
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

    static createUser(username : string, password : string) : Promise<User> {
        return bcrypt.hash(password, 10).then(hash => cypher(
            'CREATE (u:User {username: {username}, password: {password}}) RETURN u',
            {
                username,
                password: hash,
            },
        ).then(result => new User(result[0].u)));
    }

    username : string;
    passHash : string;
    role : string;

    constructor({
        username,
        password,
    } : {
        username : string,
        password : string,
    }) {
        this.username = username;
        this.passHash = password;
        this.role = '';

        users[username] = this;
    }

    validatePassword(password : string) : Promise<boolean> {
        return bcrypt.compare(password, this.passHash);
    }

    set password(password : string) : void {
        bcrypt.hash(password, 10).then(hash => cypher(
            `MATCH (u:User {username: {username}})
            SET u.password = {hash}`,
            {
                username: this.username,
                hash,
            },
        ).then(() => { this.passHash = hash; }));
    }

    toObject() {
        return {
            username: this.username,
            role: this.role,
        };
    }
}
