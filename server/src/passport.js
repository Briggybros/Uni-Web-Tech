// @flow
import passport from 'passport';
import { Strategy as JSONStrategy } from 'passport-json';

import User from './models/User';

export default function init(app: express$Application) {
    passport.serializeUser((user: User, done) => done(null, user.email));
    passport.deserializeUser((email: string, done) => User.getUser(email)
        .then(user => done(null, user)));

    passport.use(new JSONStrategy({
        usernameProp: 'email',
        passwordProp: 'password',
    }, (email, password, done) => {
        User.getUser(email)
            .then((user) => {
                if (user) {
                    return user.validatePassword(password)
                        .then((result) => {
                            if (result) {
                                return done(null, user);
                            }
                            return done(null, false);
                        });
                }
                return done(null, false);
            })
            .catch(err => done(err));
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}
