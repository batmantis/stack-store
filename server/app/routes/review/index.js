'use strict';

var router = require('express').Router()
var db = require('../../../db')
var Review = db.model('review')

module.exports = router
