'use strict';

var router = require('express').Router()
var db = require('../../../db')
var _ = require('lodash')
var Order = db.model('order')
var Product = db.model('product')
var ProductOrders = db.model('productOrders')
var Address = db.model('address')
var Billing = db.model('billing')
var stripe = require("stripe")("sk_test_FdOK9Gv2DntFbqPsbYht0fqz");
var Promise = require('sequelize').Promise
module.exports = router

//attach all data for orderid
router.param('orderId', function(req, res, next, orderId) {
    Order.findById(orderId, {
            include: [Address, Billing, Product]
        })
        .then(function(order) {
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
    Order.findAll({ where: req.query })
        .then(function(orders) {
            res.send(orders)
        })
        .catch(next)
})

//Get all orders with filter (Created, Pending, etc.)
router.get('/filter/:orderStatus', function(req, res, next) {
    Order.findAll({
            where: {
                orderStatus: req.params.orderStatus
            }
        })
        .then(orders => res.send(orders))
        .catch(next)
})

//Get one order by id
router.get('/:orderId', function(req, res, next) {
    res.send(req.order)
})

//Create new order
router.post('/', function(req, res, next) {
    if (_.isEmpty(req.body.cart)) next(new Error('Cannot create an order with empty cart'))
    else {
        var orderDetails = req.body
        orderDetails.email = orderDetails.email || req.user.email
        orderDetails.userId = req.user ? req.user.id : null
        if (orderDetails.billingId === null) {
            Address.create(orderDetails.address)
                .then((newAddress) => orderDetails.addressId = newAddress.id)
                .then(function() {
                    return Billing.create(orderDetails.billing)
                })
                .then((newBilling) => orderDetails.billingId = newBilling.id)
                .then(function() {
                    Order.createNewOrder(orderDetails)
                        .then(function(data) {
                            res.send(data)
                        })
                        .catch(next)
                })
        } else {

            Order.createNewOrder(orderDetails)
                .then(function(data) {
                    res.send(data)
                })
                .catch(next)
        }
    }
})

router.get('/suggestions/:productId', function(req, res, next) {
    Product.findById(req.params.productId)
        .then(function(product) {
            return product.getOrders({ include: [Product] });
        })
        .then(function(orders) {
            res.send(orders);
        })
        .catch(next);
});

router.put('/:orderId', function(req, res, next) {
    if (req.user.isAdmin) {
        next();
    } else {
        var error = new Error('not an admin');
        error.status = 403;
        next(error);
    }
})

router.delete('/:orderId', function(req, res, next) {
    if (req.user.isAdmin) {
        next();
    } else {
        var error = new Error('not an admin');
        error.status = 403;
        next(error);
    }
})

router.put('/:orderId', function(req, res, next) {
    req.order.update(req.body)
        .then(function(order) {
            res.send(order)
        })
        .catch(next);
})

router.delete('/:orderId', function(req, res, next) {
    req.order.destroy()
        .then(function() {
            res.sendStatus(204)
        })
        .catch(next);
})
