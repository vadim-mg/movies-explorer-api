const User = require('../models/user');
const Error404 = require('../errors/error-404');
const Error400 = require('../errors/error-400');

const getUser = (req, res, next) => User
  .findById(req.params.userId, 'name email')
  .orFail(() => {
    throw new Error('NotFound');
  })
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new Error400('Переданны не корректные данные'));
    }
    if (err.message === 'NotFound') {
      return next(new Error404('Пользователь по указанному _id не найден'));
    }
    return next(err);
  });

const getCurrentUser = (req, res) => {
  req.params.userId = req.user._id;
  getUser(req, res);
};

const updateCurrentUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true, select: 'name email' })
    .orFail(() => new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new Error400('Переданы некорректные данные при обновления пользователя'));
      }
      if (err.message === 'NotFound') {
        return next(new Error404('Пользователь по указанному _id не найден'));
      }
      return next(err);
    });
};

module.exports = { getCurrentUser, updateCurrentUser };
