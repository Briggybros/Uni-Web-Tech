// @flow
import path from 'path';
import express from 'express';
import http from 'http';
import https from 'https';
import pem from 'pem';
import type { $Response, $Request, NextFunction } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

import api from './api/index';
import { init as initDatabase } from './database';
import initPassport from './passport';

import config from '../../config.json';

initDatabase();

const HTTP_PORT : number = config.server.ports.HTTP || 8080;
const HTTPS_PORT : number = config.server.ports.HTTPS || 8081;
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
        maxAge: 31536000000,
    },
}));
app.use(passport.initialize);
app.use(passport.session);


app.use('/api', api);

app.get('*', xhtmlify, (req: $Request, res: $Response) => {
    res.sendFile(path.join(DIST, 'index.html'));
});

const httpServer = http.createServer(app);
httpServer.listen(HTTP_PORT.toString(), () => {
    console.log(`HTTP: Listening on port: ${HTTP_PORT}`);
});

pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
    if (err) {
        throw err;
    }

    const httpsServer = https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app);
    httpsServer.listen(HTTPS_PORT.toString(), () => {
        console.log(`HTTPS: Listening on port: ${HTTPS_PORT}`);
    });
});
