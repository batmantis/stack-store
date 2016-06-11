'use strict';

var router = require('express').Router()
var db = require('../../../db')
var Order = db.model('order')
var Product = db.model('product')
var ProductOrders = db.model('productOrders')
module.exports = router

//attach all data for orderid
router.param('orderId', function (req, res, next, orderId) {
    Order.findById(orderId)
    .then(function (order) {
        if (order) {
            req.order = order;
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
    res.send(req.order)
})

//Create new order
router.post('/', function(req, res, next) {
  // console.log(req.body)
  // console.log(req.user)
  var orderDetails = req.body
  var productIds = Object.keys(orderDetails.cart)
  // console.log(productIds)
  var order = {
    orderTotal: 0,
    guestEmail: orderDetails.email
  }
  Product.findAll({ where: {id: {$in: productIds}} })
      .then(function(products) {
        var cartProducts = products.map((product) => {
          order.orderTotal += orderDetails.cart[product.id] * product.price
          return {
            productId: product.id,
            quantity: orderDetails.cart[product.id],
            itemPrice: product.price,
          }
        })
        return Order.create({
            orderTotal: order.orderTotal,
            guestEmail: order.guestEmail,
            productOrders: cartProducts,
            addressId: orderDetails.addressId,
            billingId: orderDetails.billingId,
            userId: req.user.id
          }, {
            include: [ProductOrders]
          })
      })
      .then(function(newOrder) {
        // return newOrder.data

      })
      .then(function(data) {
        res.sendStatus(200)
      })
      .catch(next)
})

router.put('/:orderId', function(req, res, next){
  if (req.user.isAdmin) {
    req.order.update(req.body)
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
    req.order.destroy()
    .then(function(){
      res.sendStatus(204)
    })
    .catch(next)
  } else {
    next(new Error('not an admin'))
  }
})
