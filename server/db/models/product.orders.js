'use strict';

var Sequelize = require('sequelize');
var db = require('../_db.js');
var Product = db.model('product');

module.exports = function (db) {
db.define('productOrders', {
		quantity: {
			type: Sequelize.INTEGER,
		},
		itemPrice: {
			type: Sequelize.FLOAT,
		}
	}, {
		instanceMethods: {
			getSubtotal: function () {
				return this.itemPrice * this.quantity;
			}
		},
		include: [Product]
	});
};
