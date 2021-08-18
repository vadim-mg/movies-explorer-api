const { Error400, Error500 } = require('../errors/errors');

module.exports = (err, req, res, next) => {
  let error = err;

  // обрабатываем 400-е ошибки, вызванные не Celebrete
  if (err.statusCode === 400 || err.name === 'CastError') {
    error = new Error400(`Ошибка запроса: ${err.message}`);
  }

  // обрабатываем ошибку сервера
  if (err.statusCode === 500) {
    error = new Error500(`На сервере произошла ошибка: ${err.message}`);
  }

  res.status(error.statusCode).send({ message: error.message });

  next();
};
