'use strict';

var Sequelize = require('sequelize');

module.exports = function (db) {
	db.define('productOrders', {
		quantity: {
			type: Sequelize.INTEGER,
		},
		subtotal: {
			type: Sequelize.FLOAT,
		}
	}, {
		instanceMethods: {
			getPriceofOne: function () {
				return this.subtotal / this.quantity;
			}
		}
	});
}