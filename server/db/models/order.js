'use strict';

var Sequelize = require('sequelize');

var db = require('../_db.js');
// var db2 = require('../index');
// console.log(db2)
// var Product = db2.model('product');
// var ProductOrders = db2.model('productOrders');

module.exports = function (db) {
	db.define('order', {
		orderTotal: {
			type: Sequelize.FLOAT,
			defaultValue: 0.00
		},
		orderStatus: {
			type: Sequelize.ENUM('Created', 'Pending', 'Delivered', 'Received'),
			defaultValue: 'Created'
		},
		guestEmail: {
			type: Sequelize.STRING,
			validate: {
				isEmail: true
			}
		},
	// },
	// {
		// classMethods: {
		// 	createNewOrder: function(orderDetails) {
		// 		var productIds = Object.keys(orderDetails.cart)
		// 	  var order = {
		// 	    orderTotal: 0,
		// 	    guestEmail: orderDetails.email
		// 	  }
		// 	  Product.findAll({ where: {id: {$in: productIds}} })
		// 	      .then(function(products) {
		// 	        var cartProducts = products.map((product) => {
		// 	          order.orderTotal += orderDetails.cart[product.id] * product.price
		// 	          return {
		// 	            productId: product.id,
		// 	            quantity: orderDetails.cart[product.id],
		// 	            itemPrice: product.price,
		// 	          }
		// 	        })
		// 	        return this.create({
		// 	            orderTotal: order.orderTotal,
		// 	            guestEmail: order.guestEmail,
		// 	            productOrders: cartProducts,
		// 	            addressId: orderDetails.addressId,
		// 	            billingId: orderDetails.billingId,
		// 	            userId: orderDetails.userId
		// 	          }, {
		// 	            include: [ProductOrders]
		// 	          })
		// 	      })
		// 	      .then(function(newOrder) {
		// 	        return newOrder.data
		//
		// 	      })
		// 	}
		// }
	});
};
