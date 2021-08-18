const routes = require('express').Router();
const signRouter = require('./sign');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { Error404 } = require('../errors/errors');

routes.use('/', signRouter);
routes.use(auth);
routes.use('/users', usersRouter);
routes.use('/movies', moviesRouter);
routes.use('/', (req) => {
  throw new Error404(`Не найден запрошенный роут:  ${req.url}`);
});

module.exports = { routes };
