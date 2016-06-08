'use strict';

var router = require('express').Router()
var db = require('../../../db')
var Order = db.model('order')
module.exports = router

//Get all orders
router.get('/', function(req, res, next) {
  Order.findAll({where: req.query})
  .then(function(orders) {
    res.send(orders)
  })
  .catch(next)
})

//Get one order by id
router.get('/:orderId', function(req, res, next) {
  Order.findById(req.params.orderId)
  .then(function(order) {
    res.send(order)
  })
  .catch(next)
})

//Create new order
router.post('/', function(req, res, next) {
  Order.create(req.body)
  .then(function(order) {
    res.send(order)
  })
  .catch(next)
})

router.put('/:orderId', function(req, res, next){
  if (req.user.isAdmin) {
    Order.findById(req.params.orderId)
    .then(function(order){
      return order.update(req.body)
    })
    .then(function(order){
      res.send(order)
    })
    .catch(next)
  } else {
    next(new Error('not an admin'))
  }
})

router.delete('/:orderId', function(req, res, next){
  if (req.user.isAdmin) {
    Order.findById(req.params.orderId)
    .then(function(order){
      return order.destroy()
    })
    .then(function(){
      res.sendStatus(204)
    })
    .catch(next)
  } else {
    next(new Error('not an admin'))
  }
})
