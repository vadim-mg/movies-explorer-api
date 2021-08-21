const router = require('express').Router();
const { celebrate } = require('celebrate');
const movieSchema = require('../schemas/movieSchema');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate(movieSchema.movie), createMovie);
router.delete('/:movieId', celebrate(movieSchema.id), deleteMovie);

module.exports = router;
