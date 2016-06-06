var router = require('express').Router()
var db = require('../../../db')
var Order = db.model('order')
module.exports = router

router.get('/', function(req, res) {
  Order.findAll({where: req.query})
  .then(function(orders) {
    res.send(orders)
  })
  .catch(next)
})

router.get('/:orderId', function(req, res) {

})
