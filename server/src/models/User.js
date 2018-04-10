// @flow
import bcrypt from 'bcrypt';

import database from '../database';
import type { UserData } from '../database';

export default class User {
    static users: {[username: string]: User} = {};

    static getUser(username: string): Promise<User> {
        if (User.users[username]) {
            return Promise.resolve(User.users[username]);
        }
        return database.select().from('users').where({
            username,
        }).then((rows: Array<UserData>) => {
            if (rows.length === 0) {
                throw new Error(`No user with username: ${username}`);
            } else if (rows.length > 1) {
                throw new Error(`Multiple users with username: ${username}`);
            } else {
                return new User(
                    rows[0].username,
                    rows[0].email,
                    rows[0].password,
                );
            }
        });
    }

    username: string;
    email: string;
    passwordHash: string;

    constructor(username: string, email: string, passwordHash: string) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        User.users[username] = this;
    }

    set password(password: string) {
        bcrypt.hash(password, 10).then(hash => database('users').where({
            username: this.username,
        }).update({
            password: hash,
        }).then(() => {
            this.passwordHash = hash;
        }));
    }


    validatePassword(password: string) {
        return bcrypt.compare(password, this.passwordHash);
    }

    toJSON(): {username: string, email: string} {
        return {
            username: this.username,
            email: this.email,
        };
    }
}
