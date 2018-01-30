import path from 'path';

const PORT: number = parseInt(process.env.PORT, 10) || 8080;
const DIST: string = path.join(__dirname, '..', 'frontend', 'dist');
