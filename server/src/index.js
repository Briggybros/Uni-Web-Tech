// @flow
import path from 'path';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import api from './api';

const PORT : number | string = process.env.PORT || 8080;
const DIST : string = path.join(__dirname, '..', '..', 'frontend', 'dist');

const app = express();

function xhtmlify(req, res, done) {
    if (req.accepts('application/xhtml+xml')) {
        res.type('application/xhtml+xml');
    } else {
        res.type('text/html');
    }
    done();
}

app.use(session({
    secret: '',
    resave: false,
    saveUninitialized: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(DIST));
app.use(passport.initialize());
app.use(passport.session);

app.use('/api', api);

app.get('./normalize.css', (req, res) => {
    res.sendFile(path.join(DIST, 'normalize.css')); // I'm sorry ik this is bad code
});
app.get('*', xhtmlify, (req, res) => {
    res.sendFile(path.join(DIST, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
