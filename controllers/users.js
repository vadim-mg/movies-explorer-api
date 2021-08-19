const User = require('../models/user');
const errors = require('../errors/errors');

const getUser = (userId, req, res, next) => User
  .findById(userId, '-_id name email')
  .orFail(() => next(new errors.Error404('Пользователь по указанному _id не найден')))
  .then((user) => res.send(user))
  .catch(next);

const getCurrentUser = (req, res, next) => getUser(req.user._id, req, res, next);

const updateCurrentUser = (req, res, next) => {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true, select: '-_id name email' })
    .orFail(() => next(new errors.Error404('Пользователь по указанному _id не найден')))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new errors.Error409(`Пользователь с email: ${err.keyValue.email} уже существует!`));
      }
      return next(err);
    });
};

module.exports = { getCurrentUser, updateCurrentUser };
