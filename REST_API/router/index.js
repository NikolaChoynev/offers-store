const router = require('express').Router();
const users = require('./users');
const offers = require('./offers');
const comments = require('./likes')

router.use('/users', users);
router.use('/offers', offers);
router.use('/likes', comments)

module.exports = router;