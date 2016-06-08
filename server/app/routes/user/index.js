'use strict';

var router = require('express').Router()
var db = require('../../../db')
var User = db.model('user')

module.exports = router

router.param('userId', function (req, res, next, userId) {
    Order.findById(userId)
    .then(function (userInfo) {
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

//Get all users
router.get('/', function(req, res, next) {
  User.findAll({where: req.query})
  .then(function(users) {
    res.send(users)
  })
  .catch(next)
})

//Get one user by id
router.get('/:orderId', function(req, res, next) {
  User.findById(req.params.orderId)
  .then(function(user) {
    res.send(user)
  })
  .catch(next)
})

//Create new user
router.post('/', function(req, res, next) {
  User.create(req.body)
  .then(function(user) {
    res.send(user)
  })
  .catch(next)
})

router.put('/:userId', function(req, res, next){
  if (req.user.isAdmin) {
    User.findById(req.params.userId)
    .then(function(user){
      return user.update(req.bodleay)
    })
    .then(function(user){
      res.send(user)
    })
    .catch(next)
  } else {
    next(new Error('not an admin'))
  }
})

router.delete('/:userId', function(req, res, next){
  if (req.user.isAdmin) {
    User.findById(req.params.userId)
    .then(function(user){
      return user.destroy()
    })
    .then(function(){
      res.sendStatus(204)
    })
    .catch(next)
  } else {
    next(new Error('not an admin'))
  }
})