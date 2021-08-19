const Movie = require('../models/movie');
const errors = require('../errors/errors');

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
        throw new errors.Error409('Этот фильм уже добавлен данным пользователем');
      }
      return 'OK';
    })
    .then(() => Movie.create(newMovie))
    .then((movie) => Movie.findById(movie._id)
      .populate({
        path: 'owner',
        model: 'User',
      }))
    .then((movie) => res.send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => Movie.findById(req.params.movieId)
  .orFail(() => new errors.Error404('Фильм с указанным _id не найден'))
  .then((movie) => {
    if (String(movie.owner._id) !== String(req.user._id)) {
      return Promise.reject(new errors.Error403('Не достаточно прав доступа'));
    }
    return Movie.findByIdAndDelete(movie._id)
      .then((c) => res.send(c));
  })
  .catch(next);

module.exports = { getMovies, createMovie, deleteMovie };
