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

                        Billing.findById(orderDetails.billingId)
                        .then(function(billingInfo){
                        		console.log('@@@@@@', billingInfo.number)
                        		return stripe.customers.create({
                        		    source: billingInfo.number,
                        		    description: orderDetails.email
                        		  })
                        })
                        .then(function(customer){
                          return stripe.charges.create({
                            amount: +order.orderTotal,
                            currency: "usd",
                            description: 'charge for' + orderDetails.email,
                            customer: customer.id
                          })
                        })

                        return self.create({
                            orderTotal: order.orderTotal,
                            guestEmail: order.guestEmail,
                            productOrders: cartProducts,
                            addressId: orderDetails.addressId,
                            billingId: orderDetails.billingId,
                            userId: orderDetails.userId
                        }, {
                            include: [ProductOrders]
                        })
                    })
            }
        }
    });
};
