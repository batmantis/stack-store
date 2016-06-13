'use strict';

var router = require('express').Router()
var db = require('../../../db')
var User = db.model('user')
var Order = db.model('order');
var Address = db.model('address');
var Billing = db.model('billing');

module.exports = router

//Get all users
router.get('/', function(req, res, next) {
    User.findAll({ where: req.query })
        .then(function(users) {
            res.send(users)
        })
        .catch(next)
})

// Create new user
router.post('/', function(req, res, next) {
    //password requirement still needed
    if (req.body.password) {
        User.create(req.body)
            .then(function(user) {
                res.send(user)
            })
            .catch(next)
    } else {
        next(new Error('invalid password'))
    }
})

// Get a user's info, including orders, addresses, billing for personal info page
router.use('/info', function (req, res, next) {
    if (req.user) {
        User.findOne({
            where: {
                id: req.user.id,
            },
            include: [Order, Address, Billing]
        })
        .then(function (user) {
            if (user) {
                req.loggedInUser = user;
                next();
                return null;
            }
        });
    } else {
        res.send();
    }
});

router.get('/info', function (req, res, next) {
    res.send(req.loggedInUser);
});



// middleware for all routes that use userId
router.param('userId', function(req, res, next, userId) {
    User.findById(userId)
        .then(function(userInfo) {
            if (userInfo) {
                req.userInfo = userInfo;
                next();
                return null;
            } else {
                var error = new Error('some message');
                error.status = 404;
                throw error;
            }
        })
        .catch(next);
});

router.get('/:userId', function(req, res, next) {
    res.send(req.userInfo)
})

router.put('/:userId', function(req, res, next) {
    if (req.user.isAdmin) {
        req.userInfo.update(req.body)
            .then(function(user) {
                res.send(user)
            })
            .catch(next)
    } else if (req.userInfo.resetPassword && req.user.id === req.userInfo.id) {
        req.userInfo.update({
                password: req.body.password
            })
            .then(function(user) {
                res.send(user)
            })
            .catch(next)
    } else {
        next(new Error('not an admin'))
    }
})

router.delete('/:userId', function(req, res, next) {
    if (req.user.isAdmin) {
        req.userInfo.destroy()
            .then(function() {
                res.sendStatus(204)
            })
            .catch(next)
    } else {
        next(new Error('not an admin'))
    }
})
