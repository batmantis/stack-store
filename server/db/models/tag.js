'use strict';

var Sequelize = require('sequelize');

module.exports = function (db) { 
	db.define('tag', {
		category: {
			type: Sequelize.STRING,
			allowNull: false,
            unique: true
		}
	})
}