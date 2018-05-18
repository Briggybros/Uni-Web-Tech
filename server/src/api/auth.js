// @flow
import { Router } from 'express';
import type { $Response } from 'express';
import passport from 'passport';

import type { Request as $Request } from './types';

import * as Response from './responses';
import sendMail, { confirmEmailTemplates } from '../email';
import User from '../models/User';

const authRouter = Router();

let verify: {[confirm: string]: User} = {};
function genString() {
    return Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 6)
        .toUpperCase();
}

authRouter.post('/login', passport.authenticate('json'), (req: $Request, res: $Response) => {
    if (req.user && req.user instanceof User && req.user.verified) {
        res.send(JSON.stringify({
            user: req.user.toJSON(),
            response: Response.Success.AUTH_SUCCESS,
        }));
    } else {
        res.send(JSON.stringify({
            response: Response.ClientError.AUTH_FAILED,
        }));
    }
});

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

        return User.createUser(
            email,
            password,
            firstName,
            lastName,
        ).then((user) => {
            const confirm = genString();

            confirmEmailTemplates(confirm).then(({ plain, html }) => {
                sendMail(
                    email,
                    'Confirm your email address',
                    plain,
                    html,
                );
                verify = {
                    ...verify,
                    [confirm]: user,
                };
                return res.send(JSON.stringify({
                    response: Response.Success.USER_CREATED,
                }));
            });
        }).catch(error => res.send(JSON.stringify({
            response: {
                ...Response.ServerError.REGISTRATION_FAILED,
                raw: error,
            },
        })));
    }
    return res.send(JSON.stringify({
        response: Response.ClientError.INVALID_REGISTRATION,
    }));
});

authRouter.post('/confirm', (req: $Request, res: $Response) => {
    if (req.body && typeof req.body === 'object' && typeof req.body.code === 'string') {
        const user = verify[req.body.code];
        if (user) {
            return user.verify().then(() => res.send(JSON.stringify({
                user: user.toJSON(),
                response: Response.Success.EMAIL_CONFIRMED,
            })));
        }
    }
    return res.send(JSON.stringify({
        response: Response.ClientError.EMAIL_CONFIRMATION_FAILED,
    }));
});

authRouter.get('/validate', (req: $Request, res: $Response) => {
    if (req.user && req.user.verified) {
        return res.send(JSON.stringify({
            user: req.user.toJSON(),
            response: Response.Success.AUTH_SUCCESS,
        }));
    }
    return res.send(JSON.stringify({
        response: Response.ClientError.AUTH_FAILED,
    }));
});

export default authRouter;
