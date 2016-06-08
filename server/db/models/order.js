'use strict';

var Sequelize = require('sequelize');

module.exports = function (db) { 
	db.define('order', {
		orderTotal: {
			type: Sequelize.FLOAT,
			defaultValue: 0.00
		},
		orderStatus: {
			type: Sequelize.STRING,
			allowNull: false,
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