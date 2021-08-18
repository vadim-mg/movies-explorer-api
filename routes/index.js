const routes = require('express').Router();
const signRouter = require('./sign');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');

routes.use('/', signRouter);
routes.use(auth);
routes.use('/users', usersRouter);
routes.use('/movies', moviesRouter);

module.exports = { routes };
