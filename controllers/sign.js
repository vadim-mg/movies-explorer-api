const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/config');

const User = require('../models/user');
const { Error409 } = require('../errors/errors');

const signup = (req, res, next) => User.create(req.body)
  .then((user) => res.send({ userId: user._id }))
  .catch((err) => {
    if (err.name === 'MongoError' && err.code === 11000) {
      return next(new Error409('Пользователь с указанным email уже зарегистрирован!'));
    }
    return next(err);
  });

const signin = (req, res, next) => User
  .findUserByCredentials(req.body.email, req.body.password)
  .then((user) => res.cookie('jwt',
    jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' }),
    {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    })
    .send({ message: 'Вы авторизовались!' }))
  .catch(next);

const signout = (req, res) => res.clearCookie('jwt').send({ message: 'Токен удалён' });

module.exports = { signup, signin, signout };
