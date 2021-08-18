require('dotenv').config();
const express = require('express');

const { errors } = require('celebrate');
const { json, urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const config = require('./utils/config');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { routes } = require('./routes/index');

// const user = require('./models/user');

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(config.dataBase, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// app.listen(config.port);
app.listen(config.port, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${config.port}`);
});
