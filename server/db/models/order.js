'use strict';

var Sequelize = require('sequelize');

var db = require('../_db.js');
// require('../index');

module.exports = function (db) {
var stripe = require("stripe")("sk_test_FdOK9Gv2DntFbqPsbYht0fqz");
var nodemailer = require('nodemailer');
var transport = nodemailer.createTransport('direct', {
    debug: true
  })};


module.exports = function(db) {
var Product = db.model('product');
var ProductOrders = db.model('productOrders');
var Address = db.model('address');
var Billing = db.model('billing');
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
                                    amount: Math.round(+order.orderTotal * 100),
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
                            .then(function(completedOrder){
                            	transport.sendMail({
                            	    from: '"Jaja Store" <foo@fbi.me>', // sender address
                            	    to: completedOrder.guestEmail, // list of receivers
                            	    subject: "Order complete", // Subject line
                            	    text: JSON.stringify(completedOrder), // plaintext body
                            	    // html: "<b>Hello world ✔</b>" // html body
                            	}, console.error);
                            	return completedOrder
                            })
                            .catch(function(err) {
                                console.log(err)
                            })
                    })
            }
        }
    });
};