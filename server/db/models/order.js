'use strict';

var Sequelize = require('sequelize');

module.exports = function (db) { 
	db.define('order', {
		orderTotal: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
		orderStatus: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: 'Created'
		}
	});
};