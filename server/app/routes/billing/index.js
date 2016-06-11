'use strict';

var router = require('express').Router()
var db = require('../../../db');
var Billing = db.model('billing');
var User = db.model('user');
var Promise = require('sequelize').Promise;

router.post('/', function(req, res, next) {
    var creatingBilling = Billing.create(req.body);

    var findingUser = User.findById(req.user.id);

    Promise.all([creatingBilling, findingUser])
    .spread(function(billing, user) {
    	user.addBilling(billing)
        res.send(billing)
    })
    .catch(next);
})

router.delete('/:billingId', function(req, res, next) {
    Promise.all([User.findById(req.user.id), Billing.findById(req.params.billingId)])
    .spread(function(user, billing) {
        return user.removeBilling(billing.id);
    })
    .then(function() {
        res.send(204);
    })
    .catch(next)
});

module.exports = router