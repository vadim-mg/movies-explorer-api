require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { json, urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { routes } = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { dataBase, port } = require('./utils/config');
const { cors } = require('./middlewares/cors');
const rateLimiter = require('./middlewares/rateLimiter');

mongoose.connect(dataBase, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();

app.use(
  cors,
  requestLogger,
  rateLimiter,
  helmet(),
);
app.disable('x-powered-by');

app.use(
  json(),
  urlencoded({ extended: true }),
  cookieParser(),
);

app.use(routes);

app.use(
  errorLogger, // логирование ошибок
  errors(), // ошибки валидации celebrate
  errorHandler, // общий обработчик ошибок
);

app.listen(port);
