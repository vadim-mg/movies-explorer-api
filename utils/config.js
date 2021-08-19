const DEVELOPMENT_ALLOWED_CORS = "['http://localhost:3001', 'https://localhost:3001']";
const DEVELOPMENT_SECRET = 'dev-secret';
const DEVELOPMENT_DBASE = 'mongodb://localhost:27017/moviesdb';
const DEVELOPMENT_PORT = 3000;

const prodMode = process.env.NODE_ENV === 'production';

module.exports = {
  secretKey: prodMode
    ? process.env.JWT_SECRET
    : DEVELOPMENT_SECRET,
  allowedCors: prodMode
    ? process.env.ALLOWED_CORS
    : DEVELOPMENT_ALLOWED_CORS,
  port: prodMode
    ? process.env.PORT
    : DEVELOPMENT_PORT,
  dataBase: prodMode
    ? process.env.DATA_BASE
    : DEVELOPMENT_DBASE,
};
