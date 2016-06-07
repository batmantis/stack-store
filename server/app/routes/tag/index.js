'use strict';

var router = require('express').Router()
var db = require('../../../db')
var Tag = db.model('tag')
var Product = db.model('product')
var TagProducts = db.model('TagProducts')
module.exports = router

//Get all tags
router.get('/', function(req, res, next) {
  Tag.findAll({where: req.query})
  .then(function(tags) {
    res.send(tags)
  })
  .catch(next)
})

//Get all products with one tag
router.get('/:tagId', function(req, res, next) {
  Tag.findOne({
  	where: {
  		id: req.params.tagId
  	}
  })
  .then(function(tag) {
  	return tag.getProducts();
  })
  .then(function(products){
  	res.send(products);
  })
  .catch(next)
})

//Create new tag
router.post('/', function(req, res, next) {
  Tag.create(req.body)
  .then(function(tag) {
    res.send(tag)
  })
  .catch(next)
})

router.put('/:tagId', function(req, res, next){
  if (req.user.isAdmin) {
    Tag.findById(req.params.tagId)
    .then(function(tag){
      return tag.update(req.body)
    })
    .then(function(tag){
      res.send(tag)
    })
    .catch(next)
  } else {
    next(new Error('not an admin'))
  }
})

router.delete('/:tagId', function(req, res, next){
  if (req.user.isAdmin) {
    Tag.findById(req.params.tagId)
    .then(function(tag){
      return tag.destroy()
    })
    .then(function(){
      res.sendStatus(204)
    })
    .catch(next)
  } else {
    next(new Error('not an admin'))
  }
})

