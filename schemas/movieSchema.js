const { Joi } = require('celebrate');
const { urlPattern } = require('../utils/regExpressions');

const movieSchema = {
  id: {
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex(),
    }),
  },
  movie: {
    body: Joi.object().keys({
      name: Joi.string(),
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(new RegExp(urlPattern)),
      trailer: Joi.string().required().pattern(new RegExp(urlPattern)),
      thumbnail: Joi.string().required().pattern(new RegExp(urlPattern)),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  },
};

module.exports = movieSchema;
