const { celebrate } = require('celebrate');

const routes = require('express').Router();
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const userSchema = require('../schemas/userSchema');
const errors = require('../errors/errors');

const { signup, signin, signout } = require('../controllers/auth');

// не защищенные роуты
routes.post('/signup', celebrate(userSchema.registerData), signup);
routes.post('/signin', celebrate(userSchema.loginData), signin);

routes.use(auth);

// защищенные роуты
routes.use('/users', usersRouter);
routes.use('/movies', moviesRouter);
routes.post('/signout', signout);

routes.use('/', (req) => {
  throw new errors.Error404(`Не найден запрошенный роут:  ${req.url}`);
});

module.exports = { routes };
