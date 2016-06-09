'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/order', require('./order'));
router.use('/product', require('./product'));
router.use('/review', require('./review'));
router.use('/tag', require('./tag'));
router.use('/user', require('./user'));
router.use('/address', require('./address'));
router.use('/billing', require('./billing'));



// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
