'use strict';

var Sequelize = require('sequelize');

module.exports = function (db) { 
	db.define('order', {
		address: {
			type: Sequelize.STRING,
			allowNull: false
		},
		creditCard: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		orderTotal: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	})
}