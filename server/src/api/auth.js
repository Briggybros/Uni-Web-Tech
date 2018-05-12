// @flow
import { Router } from 'express';
import type { $Request, $Response } from 'express';
import passport from 'passport';

import sendMail from '../email';
import User from '../models/User';

const authRouter = Router();

let verify: {[confirm: string]: User} = {};

authRouter.post('/login', passport.authenticate('json'));

function genString() {
    return Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 6)
        .toUpperCase();
}

authRouter.post('/register', (req: $Request, res: $Response) => {
    if (
        req.body &&
        typeof req.body === 'object' &&
        typeof req.body.email === 'string' &&
        typeof req.body.password === 'string' &&
        typeof req.body.firstName === 'string' &&
        typeof req.body.lastName === 'string'
    ) {
        const {
            email,
            password,
            firstName,
            lastName,
        } = req.body;

        User.createUser(
            email,
            password,
            firstName,
            lastName,
        ).then((user) => {
            const confirm = genString();
            sendMail(
                email,
                'Please confirm your email:',
                `http://localhost:8080/login/confirm?code=${confirm}`,
                `<a href="http://localhost:8080/login/confirm?code=${confirm}">Confirm your email</a>`,
            );
            verify = {
                ...verify,
                [confirm]: user,
            };
            return res.sendStatus(200);
        }).catch(console.error);
    } else {
        return res.sendStatus(400);
    }
});

authRouter.post('/confirm', (req: $Request, res: $Response) => {
    if (req.body && typeof req.body === 'object' && typeof req.body.code === 'string') {
        const user = verify[req.body.code];
        if (user) {
            user.verify().then(() => res.sendStatus(200));
        }
    } else {
        return res.sendStatus(400);
    }
});

authRouter.get('/vbodyalidate', passport.authenticate('json'), (req: {user: User}, res) => {
    if (req.user) {
        return res.status(200).send(JSON.stringify(req.user.toJSON()));
    }
    return res.sendStatus(400);
});

export default authRouter;
