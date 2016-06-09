'use strict';

var Sequelize = require('sequelize');

module.exports = function (db) { 
	db.define('review', {
		title: {
			type: Sequelize.STRING,
			validate: {
				len: [10, 20]
			}
		},
		rating: {
			type: Sequelize.INTEGER,
			validate: {
				min: 0,
				max: 5
			}
		},
		comment: {
			type: Sequelize.TEXT,
			validate: {
				len: [100, 700]
			}
		}
	})
}
