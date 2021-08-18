const { Joi } = require('celebrate');

const userSchema = {
  userInfo: {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().min(2).max(30),
    }),
  },
  authData: {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  },
};

module.exports = userSchema;
