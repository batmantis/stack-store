var router = require('express').Router()
var db = require('../../../db')
var Order = db.model('order')
var User = db.model('user')
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
  Order.findById({where: {id: req.params.orderId}})
  .then(function(order) {
    res.send(order)
  })
  .catch(next)
})

//Create new order
router.post('/', function(req, res) {
  Order.create(req.body)
  .then(function(order) {
    res.send(order)
  })
  .catch(next)
})
