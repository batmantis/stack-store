'use strict';

var router = require('express').Router()
var db = require('../../../db')
var Product = db.model('product')
var Review = db.model('review')
var Tag = db.model('tag')
var User = db.model('user')
var _ = require('lodash')

module.exports = router

//Get all products or search query
router.get('/', function(req, res, next) {
  Product.findAll({where: req.query})
  .then(function(products) {
    res.send(products)
  })
  .catch(next)
})

//Get one product by id
router.get('/:productId', function(req, res, next) {
  Product.findById(req.params.productId)
  .then(function(product) {
    res.send(product)
  })
  .catch(next)
})

//Create new product
router.post('/', function(req, res, next) {
  Product.create(req.body)
  .then(function(product) {
    res.send(product)
  })
  .catch(next)
})

router.put('/:productId', function(req, res, next){
  if (req.user.isAdmin) {
    Product.findById(req.params.productId)
    .then(function(product){
      return product.update(req.body)
    })
    .then(function(product){
      res.send(product)
    })
    .catch(next)
  } else {
    next(new Error('not an admin'))
  }
})

router.put('/:productId/tags/:tagId', function(req, res, next){
	if (req.user.isAdmin) {
		Product.findById(req.params.productId)
		.then(function(product){
			return Tag.findById(req.params.tagId)
			.then(function(tag){
				return product.addTag(tag);
			})
		})
		.then(function(){
			res.sendStatus(204)
		})
	} else {
		next(new Error('not an admin'))
	}
})

router.delete('/:productId', function(req, res, next){
  if (req.user.isAdmin) {
    Product.findById(req.params.productId)
    .then(function(product){
      return product.destroy()
    })
    .then(function(){
      res.sendStatus(204)
    })
    .catch(next)
  } else {
    next(new Error('not an admin'))
  }
})

router.delete('/:productId/tags/:tagId', function(req, res, next){
	if (req.user.isAdmin) {
		Product.findById(req.params.productId)
		.then(function(product){
			return Tag.findById(req.params.tagId)
			.then(function(tag){
				return product.removeTag(tag);
			})
		})
		.then(function(){
			res.sendStatus(204)
		})
	} else {
		next(new Error('not an admin'))
	}
})

//Get all reviews for a product or query for a specific number of reviews
router.get('/:productId/reviews/', function(req, res, next) {
	if (_.isEmpty(req.query)) req.query.reviewCount = null
	Review.findAll({
		where: {
			productId: req.params.productId
		},
		limit: req.query.reviewCount
	})
	.then(function(reviews) {
		res.send(reviews)
	})
	.catch(next)
})


router.post('/:productId/reviews', function(req, res, next){
	User.findById(req.user.id)
	.then(function(user){
		return Review.create(req.body)
		.then(function(review){
			return user.addReview(review)
		})
	})
	.then(function(){
		res.sendStatus(204)
	})
	.catch(next)
})