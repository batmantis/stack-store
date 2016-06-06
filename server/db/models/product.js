'use strict';

var Sequelize = require('sequelize');

module.exports = function (db) { 
	db.define('product', {
		name: {
			type: Sequelize.STRING,
			allowNull: false,
            unique: true
		},
		imageUrl: {
			type: Sequelize.STRING,
			defaultValue: 'http://localhost/defaultproduct.jpg',
		},
		price: {
			type: Sequelize.FLOAT,
			allowNull: false,
			validate: {
				min: 0.01
			}
		},
		brand: {
			type: Sequelize.STRING,
			allowNull: false
		},
		description: {
			type: Sequelize.TEXT,
			allowNull: false
		},
		quantity: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	})
}