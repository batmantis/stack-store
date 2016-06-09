'use strict';

var router = require('express').Router()
var db = require('../../../db')
var Billing = db.model('billing')
var User = db.model('user')


module.exports = router