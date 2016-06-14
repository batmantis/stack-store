'use strict';

var Sequelize = require('sequelize');

module.exports = function (db) { 
	db.define('billing', {
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		address: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		city: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		state: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
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
				isCreditCard: true,
				notEmpty: true
			}
		}
	});
}