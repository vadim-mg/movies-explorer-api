require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const { json, urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { routes } = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { dataBase, port } = require('./utils/config');

mongoose.connect(dataBase, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();

app.use(
  requestLogger,
  json(),
  urlencoded({ extended: true }),
  cookieParser(),
);

app.use(routes);

app.use(
  errorLogger,
  errors(), // ошибки валидации celebrate
  errorHandler, // общий обработчик ошибок
);

app.listen(port);
