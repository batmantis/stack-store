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
			defaultValue: 'defaultproduct.jpg',
			get: function() {
				var img = this.getDataValue('imageUrl');
				if (img.startsWith('http')) {
					return img
				} else {
					return 'http://localhost/images/' + img
				}
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
	})
}