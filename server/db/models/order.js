'use strict';

var Sequelize = require('sequelize');

var db = require('../_db.js');
// require('../index');
var Product = db.model('product');
var ProductOrders = db.model('productOrders');
var Address = db.model('address');
var Billing = db.model('billing');
var stripe = require("stripe")("sk_test_FdOK9Gv2DntFbqPsbYht0fqz");


module.exports = function(db) {
    db.define('order', {
        orderTotal: {
            type: Sequelize.FLOAT,
            defaultValue: 0.00
        },
        orderStatus: {
            type: Sequelize.ENUM('Created', 'Pending', 'Shipped', 'Delivered'),
            defaultValue: 'Pending'
        },
        guestEmail: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        token: {
        	type: Sequelize.STRING
        }
    }, {
        classMethods: {
            createNewOrder: function(orderDetails) {
                var self = this
                var productIds = Object.keys(orderDetails.cart)
                var order = {
                    orderTotal: 0,
                    guestEmail: orderDetails.email
                }

                //fix this down here
                return Product.findAll({ where: { id: { $in: productIds } } })
                    .then(function(products) {
                        var cartProducts = products.map((product) => {
                            order.orderTotal += orderDetails.cart[product.id] * product.price
                            return {
                                productId: product.id,
                                quantity: orderDetails.cart[product.id],
                                itemPrice: product.price,
                            }
                        })

                        return stripe.customers.create({
                                source: orderDetails.stripeToken,
                                description: orderDetails.email
                            })
                            .then(function(customer) {
                                return stripe.charges.create({
                                    amount: +order.orderTotal * 100,
                                    currency: "usd",
                                    description: 'charge for' + orderDetails.email,
                                    customer: customer.id
                                })
                            })
                            .then(function() {
                                return self.create({
                                    orderTotal: order.orderTotal,
                                    guestEmail: order.guestEmail,
                                    productOrders: cartProducts,
                                    addressId: orderDetails.addressId,
                                    billingId: orderDetails.billingId,
                                    token: orderDetails.stripeToken,
                                    userId: orderDetails.userId
                                }, {
                                    include: [ProductOrders]
                                })
                            })
                            .catch(function(err) {
                                console.log(err)
                            })
                    })
            }
        }
    });
};
