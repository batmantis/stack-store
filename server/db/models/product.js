'use strict';

var Sequelize = require('sequelize');

module.exports = function (db) { 
	db.define('product', {
		name: {
			type: Sequelize.STRING,
			allowNull: false,
            unique: true
		},
		imageUrls: {
			type: Sequelize.ARRAY(Sequelize.STRING),
			defaultValue: [],
			get: function () {
				if (this.getDataValue(imageUrls).length === 0) {
					return '/defaultproduct.jpg';
				}
				return this.getDataValue(imageUrls);
			}
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
	});
}