import path from 'path';

const PORT: number = parseInt(process.env.PORT, 10) || 8080;
const DIST: string = path.join(__dirname, '..', 'frontend', 'dist');

function xhtmlify(req, res, done) {
    if (req.accepts('application/xhtml+xml')) {
        res.type('application/xhtml+xml');
    } else {
        res.type('text/html');
    }
    done();
}
