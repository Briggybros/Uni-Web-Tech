// @flow
import path from 'path';
import express from 'express';

import * as database from './database';

const PORT : number | string = process.env.PORT || 8080;
const DIST : string = path.join(__dirname, '..', '..', 'frontend', 'dist');

const app = express();
database.init();

function xhtmlify(req, res, done) {
    if (req.accepts('application/xhtml+xml')) {
        res.type('application/xhtml+xml');
    } else {
        res.type('text/html');
    }
    done();
}

app.use(express.static(DIST));

app.get('*', xhtmlify, (req, res) => {
    res.sendFile(path.join(DIST, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

function exitHandler(err) {
    if (err) console.error(err);
    database.close();
    process.exit();
}

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);
process.on('uncaughtException', err => exitHandler(err));
