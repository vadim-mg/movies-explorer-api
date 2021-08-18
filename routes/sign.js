const router = require('express').Router();
const { celebrate } = require('celebrate');
const userSchema = require('../schemas/userSchema');
const { signup, signin, signout } = require('../controllers/sign');

router.post('/signup', celebrate(userSchema.authData), signup);
router.post('/signin', celebrate(userSchema.authData), signin);
router.post('/signout', signout);

module.exports = router;
