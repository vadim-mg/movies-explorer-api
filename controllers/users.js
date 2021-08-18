const User = require('../models/user');
const { Error404 } = require('../errors/errors');

const getUser = (userId, req, res, next) => User
  .findById(userId, 'name email')
  .orFail(() => next(new Error404('Пользователь по указанному _id не найден')))
  .then((user) => res.send(user))
  .catch(next);

const getCurrentUser = (req, res, next) => getUser(req.user._id, req, res, next);

const updateCurrentUser = (req, res, next) => {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true, select: 'name email' })
    .orFail(() => next(new Error404('Пользователь по указанному _id не найден')))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = { getCurrentUser, updateCurrentUser };
