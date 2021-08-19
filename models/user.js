const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { Error401 } = require('../errors/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (v) => validator.isEmail(v),
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.pre('save', function bcryptPass(next) {
  if (this.isModified('password')) {
    return bcrypt.hash(this.password, 10)
      .then((hash) => {
        this.password = hash;
        return next();
      })
      .catch(next);
  }
  return next();
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  const errorMessage = 'Неправильные почта или пароль';
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error401(errorMessage));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => (matched ? user : Promise.reject(new Error401(errorMessage))));
    });
};

module.exports = mongoose.model('User', userSchema);
