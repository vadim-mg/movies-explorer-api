const Movie = require('../models/movie');
const Error400 = require('../errors/error-400');
const Error403 = require('../errors/error-403');
const Error404 = require('../errors/error-404');
const Error409 = require('../errors/error-409');

const getMovies = (req, res, next) => Movie.find({})
  .populate({
    path: 'owner',
    model: 'User',
  })
  .then((movies) => res.send(movies))
  .catch(next);

const createMovie = (req, res, next) => {
  const newMovie = req.body;
  newMovie.owner = req.user._id;

  Movie.find(newMovie)
    .then((movie) => {
      if (movie.length !== 0) {
        throw new Error('Dublicate');
      }
      return 'Фильм можно добавлять..';
    })
    .then(() => Movie.create(newMovie))
    .then((movie) => Movie.findById(movie._id)
      .populate({
        path: 'owner',
        model: 'User',
      }))
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new Error400('Не корректные входные данные '));
      }
      if (err.message === 'Dublicate') {
        return next(new Error409('Этот фильм уже добавлен данным пользователем'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => Movie.findById(req.params.movieId)
  .orFail(() => new Error('NotFound'))
  .then((movie) => {
    if (String(movie.owner._id) !== String(req.user._id)) {
      return Promise.reject(new Error('noAccessRights'));
    }
    return Movie.findByIdAndDelete(movie._id)
      .then((c) => res.send(c));
  })
  .catch((err) => {
    if (err.message === 'NotFound') {
      return next(new Error404('Картока с указанным _id не найдена'));
    }
    if (err.name === 'CastError') {
      return next(new Error400('Переданны не корректные данные'));
    }
    if (err.message === 'noAccessRights') {
      return next(new Error403('Не достаточно прав доступа'));
    }
    return next(err);
  });

module.exports = { getMovies, createMovie, deleteMovie };
