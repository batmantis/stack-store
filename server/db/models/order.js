'use strict';

var Sequelize = require('sequelize');

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
	});
};
