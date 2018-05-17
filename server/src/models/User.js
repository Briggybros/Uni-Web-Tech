// @flow
import bcrypt from 'bcrypt';

import database from '../database';
import type { UserData, UserRolesData } from '../database';

export default class User {
    static createUser(email: string, password: string, firstName: string, lastName: string) {
        return bcrypt.hash(password, 10).then(hash => database('users').insert({
            email,
            password: hash,
            firstName,
            lastName,
            verified: false,
        }).then(() => new User(email, hash, firstName, lastName, false, [])));
    }

    static getUser(email: string): Promise<User> {
        return database.select().from('users').where({
            email,
        }).then((rows: UserData[]) => {
            if (rows.length === 0) {
                throw new Error(`No user with email: ${email}`);
            } else if (rows.length > 1) {
                throw new Error(`Multiple users with email: ${email}`);
            } else {
                return database.select().from('user_roles').where({
                    email,
                }).then((rows2: UserRolesData[]) => new User(
                    rows[0].email,
                    rows[0].password,
                    rows[0].firstName,
                    rows[0].lastName,
                    rows[0].verified,
                    rows2.map(userRole => userRole.role),
                ));
            }
        });
    }

    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    verified: boolean;
    roles: string[];

    constructor(
        email: string,
        passwordHash: string,
        firstName: string,
        lastName: string,
        verified: boolean,
        roles: string[],
    ) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.firstName = firstName;
        this.lastName = lastName;
        this.verified = verified;
        this.roles = roles;
    }

    set password(password: string) {
        bcrypt.hash(password, 10).then(hash => database('users').where({
            email: this.email,
        }).update({
            password: hash,
        }).then(() => {
            this.passwordHash = hash;
        }));
    }


    validatePassword(password: string) {
        return bcrypt.compare(password, this.passwordHash);
    }

    verify() {
        return database('users').where({
            email: this.email,
        }).update({
            verified: true,
        });
    }

    toJSON() {
        return {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            verified: this.verified,
            roles: this.roles,
        };
    }
}
