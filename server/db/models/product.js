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
			type: Sequelize.ARRAY(Sequelize.STRING),
			defaultValue: [],
			set: function(imageUrl) {
			    //console.log(tags.join(', '));
			    this.setDataValue('imageUrl', imageUrl || []);
			},
			get: function() {
			    return this.getDataValue('imageUrl').join(', ');
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
		}
	})
}