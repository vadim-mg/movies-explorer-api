const { Joi } = require('celebrate');

const userSchema = {
  userInfo: {
    body: Joi.object().keys({
      email: Joi.string().required().email({ tlds: { allow: false } }),
      name: Joi.string().min(2).max(30),
    }),
  },
  loginData: {
    body: Joi.object().keys({
      email: Joi.string().required().email({ tlds: { allow: false } }),
      password: Joi.string().required(),
    }),
  },
  registerData: {
    body: Joi.object().keys({
      email: Joi.string().required().email({ tlds: { allow: false } }),
      password: Joi.string().required(),
      name: Joi.string().required().min(2).max(30),
    }),
  },
};

module.exports = userSchema;
