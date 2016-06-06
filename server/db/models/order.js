'use strict';

var Sequelize = require('sequelize');

module.exports = function (db) { 
	db.define('order', {
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
		billingaddress: {
			type: Sequelize.STRING,
			allowNull: false
		},
		billingcity: {
			type: Sequelize.STRING,
			allowNull: false
		},
		billingstate: {
			type: Sequelize.STRING,
			allowNull: false
		},
		billingzipcode: {
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
		},
		orderTotal: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
		orderStatus: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: 'Created'
		}
	})
}