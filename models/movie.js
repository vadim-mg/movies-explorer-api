const mongoose = require('mongoose');
const { urlPattern } = require('../utils/regExpressions');

const movieSchema = new mongoose.Schema({

  // страна создания фильма.
  country: {
    type: String,
    required: true,
  },

  // режиссёр фильма.
  director: {
    type: String,
    required: true,
  },

  // длительность фильма.
  duration: {
    type: Number,
    required: true,
  },

  // год выпуска фильма.
  year: {
    type: String,
    required: true,
  },

  // описание фильма.
  description: {
    type: String,
    required: true,
  },

  // ссылка на постер к фильму.
  image: {
    type: String,
    required: true,
    validate: (v) => urlPattern.test(v),
  },

  // ссылка на трейлер фильма.
  trailer: {
    type: String,
    required: true,
    validate: (v) => urlPattern.test(v),
  },

  // миниатюрное изображение постера к фильму.
  thumbnail: {
    type: String,
    required: true,
    validate: (v) => urlPattern.test(v),
  },

  // _id пользователя, который сохранил фильм.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    red: 'user',
    required: true,
  },

  // id фильма, который содержится в ответе сервиса MoviesExplorer.
  movieId: {
    type: Number,
    required: true,
  },

  // название фильма на русском языке.
  nameRU: {
    type: String,
    required: true,
  },

  // название фильма на английском языке.
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Movie', movieSchema)