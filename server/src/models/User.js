// @flow
import bcrypt from 'bcrypt';
import { query } from './Database';

const users : Object = {};

export default class User {
    static getUser(username : string) : Promise<User | null> {
        if (users[username]) return Promise.resolve(users[username]);
        return query('SELECT * FROM `users` WHERE `username`=?', [username]).then((result) => {
            if (result.results[0]) {
                return new User(result.results[0]);
            }
            return null;
        });
    }

    static createUser(username : string, password : string) : Promise<User> {
        return bcrypt.hash(password, 10).then(hash => query('INSERT INTO `users` (username, password) VALUES (?, ?)', [username, hash]).then(result => new User(result.results[0])));
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
        bcrypt.hash(password, 10).then(hash => query('UPDATE `users` SET password=? WHERE `username`=?', [this.username]).then(() => { this.passHash = hash; }));
    }

    toObject() {
        return {
            username: this.username,
            role: this.role,
        };
    }
}
