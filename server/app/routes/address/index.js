'use strict';

var router = require('express').Router()
var db = require('../../../db')
var Address = db.model('address')
var User = db.model('user')
var Promise = require('sequelize').Promise


module.exports = router

router.post('/', function(req, res, next){
	var creatingAddress = Address.create(req.body)

	var findingUser = User.findById(req.user.id)

	Promise.all([creatingAddress, findingUser])
	.spread(function(address, user){
		res.send(address)
		user.addAddress(address)
	})
	.catch(next)
})