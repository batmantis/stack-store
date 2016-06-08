'use strict';

var Sequelize = require('sequelize');

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
		}
	});
};