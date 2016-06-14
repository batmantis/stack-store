'use strict';

///
///


var Sequelize = require('sequelize');

module.exports = function (db) {
	db.define('billing', {
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
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
		}
	});
}
