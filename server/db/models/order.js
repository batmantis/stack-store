'use strict';

var Sequelize = require('sequelize');

var db = require('../_db.js');
// require('../index');
var Product = db.model('product');
var ProductOrders = db.model('productOrders');
var Address = db.model('address');
var Billing = db.model('billing');

module.exports = function (db) {
	db.define('order', {
		orderTotal: {
			type: Sequelize.FLOAT,
			defaultValue: 0.00
		},
		orderStatus: {
			type: Sequelize.ENUM('Created', 'Pending', 'Shipped', 'Delivered'),
			defaultValue: 'Created'
		},
		guestEmail: {
			type: Sequelize.STRING,
			validate: {
				isEmail: true
			}
		},
	},
	{
		classMethods: {
			createNewOrder: function(orderDetails) {
				var self = this
				var productIds = Object.keys(orderDetails.cart)
			  var order = {
			    orderTotal: 0,
			    guestEmail: orderDetails.email
			  }
			  return Product.findAll({ where: {id: {$in: productIds}} })
			      .then(function(products) {
			        var cartProducts = products.map((product) => {
			          order.orderTotal += orderDetails.cart[product.id] * product.price
			          return {
			            productId: product.id,
			            quantity: orderDetails.cart[product.id],
			            itemPrice: product.price,
			          }
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
			      .then(function(newOrder) {
			        return newOrder
			      })
			}
		}
	});
};
