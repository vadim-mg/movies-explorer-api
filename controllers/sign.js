const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const User = require('../models/user');
const Error400 = require('../errors/error-400');
const Error409 = require('../errors/error-409');
// const Error404 = require('../errors/error-404');

const signup = (req, res, next) => User.create(req.body)
  .then((user) => res.send({ userId: user._id }))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new Error400('Не корректно указан email или пароль'));
    }
    if (err.name === 'MongoError' && err.code === 11000) {
      return next(new Error409('Пользователь с указанным email уже зарегистрирован!'));
    }
    return next(err);
  });

const signin = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, config.secretKey, { expiresIn: '7d' });
      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Вы авторизовались!!' });
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie('jwt')
    .send({ message: 'Токен удалён' });
};

module.exports = { signup, signin, signout };
