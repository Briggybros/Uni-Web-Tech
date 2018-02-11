import { Router } from 'express';
import passport from 'passport';
import { Strategy as JSONStrategy } from 'passport-json';
import User from '../models/User';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => done(null, id));

passport.use(new JSONStrategy((username, password, done) => {
    User.getUser(username)
        .then(user => user.validatePassword(password)
            .then((result) => {
                if (result) {
                    return done(null, user);
                }
                return done(null, false);
            }))
        .catch(err => done(err));
}));

const authRouter = Router();

authRouter.post('/login', passport.authenticate('json', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

authRouter.get('/validate', passport.authenticate('json'), (req, res) => {
    if (req.user) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

export default authRouter;
