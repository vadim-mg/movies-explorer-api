const { Error400, Error500 } = require('../errors/errors');

module.exports = (err, req, res, next) => {
  let error = err;

  // обрабатываем ошибки относящиеся к статусу 400, но которые не были пойманы Celebrete
  if (err.statusCode === 400 || err.name === 'CastError' || err.name === 'ValidationError') {
    error = new Error400(`Ошибка в запросе: ${err.message}`);
  }

  // все остальные ошибки, возвращаем как ошибку сервера
  if (!error.statusCode) {
    error = new Error500('На сервере произошла какя-то ошибка!');
  }

  res.status(error.statusCode).send({ message: error.message });

  next();
};
