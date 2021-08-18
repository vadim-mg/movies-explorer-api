const router = require('express').Router();
const { celebrate } = require('celebrate');
const userSchema = require('../schemas/userSchema');
const { getCurrentUser, updateCurrentUser } = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', /* celebrate(userSchema.userInfo), */ updateCurrentUser);

module.exports = router;
