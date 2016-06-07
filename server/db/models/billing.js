'use strict';

var Sequelize = require('sequelize');

module.exports = function (db) { 
	db.define('billing', {
		address: {
			type: Sequelize.STRING,
			allowNull: false
		},
		city: {
			type: Sequelize.STRING,
			allowNull: false
		},
		state: {
			type: Sequelize.STRING,
			allowNull: false
		},
		zipcode: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				len: [5,6]
			}
		},
		creditCard: {
			type: Sequelize.BIGINT,
			allowNull: false,
			validate: {
				isCreditCard: true
			}
		}
	});
}