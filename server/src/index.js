// @flow
import path from 'path';
import express from 'express';
import type { $Response, $Request, NextFunction } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import api from './api/index';
import { init as initDatabase } from './database';
import initPassport from './passport';

initDatabase();

const PORT : number | string = process.env.PORT || 8080;
const DIST : string = path.join(__dirname, '..', '..', 'frontend', 'dist');

const app = express();

function xhtmlify(req: $Request, res: $Response, done: NextFunction) {
    if (req.accepts('application/xhtml+xml')) {
        res.type('application/xhtml+xml');
    } else {
        res.type('text/html');
    }
    return done();
}

const passport = initPassport();

app.use(express.static(DIST));
app.use(bodyParser.json());
app.use(session({
    secret: 'UMRQlXrka6MIYrBMVMZOz5JvsPq1i9EymesiDdAa0AQtEt9yRj5wHHQ8IHtqCKmP',
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: false,
    },
}));
app.use(passport.initialize);
app.use(passport.session);


app.use('/api', api);

app.get('*', xhtmlify, (req: $Request, res: $Response) => {
    res.sendFile(path.join(DIST, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
