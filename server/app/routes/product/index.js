'use strict';

var router = require('express').Router()
var db = require('../../../db')
var Product = db.model('product')
var Review = db.model('review')
var Tag = db.model('tag')
var User = db.model('user')
var _ = require('lodash')

module.exports = router

router.param('productId', function(req, res, next, productId) {
    Product.findById(productId)
        .then(function(product) {
            if (product) {
                req.product = product;
                next();
                return null;
            } else {
                var error = new Error('some message');
                error.status = 404;
                throw error;
            }
        })
        .catch(next);
});

//Get all products
router.get('/', function(req, res, next) {
    Product.findAll()
        .then(function(products) {

            res.send(products)
        })
        .catch(next)
})

router.get('/search/', function(req, res, next) {
    Product.findAll({ where: { name: { $iLike: '%' + req.query.name + '%' } } })
        .then(function(products) {

            res.send(products)
        })
        .catch(next)
})


//Get one product by id
router.get('/:productId', function(req, res, next) {
    res.send(req.product)
})

//Create new product
router.post('/', function(req, res, next) {
    Product.create(req.body)
        .then(function(product) {
            res.send(product)
        })
        .catch(next)
})

router.put('/:productId', function(req, res, next) {
    if (req.user.isAdmin) {
        req.product.update(req.body)
            .then(function(product) {
                res.send(product)
            })
            .catch(next)
    } else {
        next(new Error('not an admin'))
    }
})

router.put('/:productId/tags/:tagId', function(req, res, next) {
    if (req.user.isAdmin) {
        Tag.findById(req.params.tagId)
            .then(function(tag) {
                return req.product.addTag(tag);
            })
            .then(function() {
                res.sendStatus(204)
            })
    } else {
        next(new Error('not an admin'))
    }
})

router.delete('/:productId', function(req, res, next) {
    if (req.user.isAdmin) {
        req.product.destroy()
            .then(function() {
                res.sendStatus(204)
            })
            .catch(next)
    } else {
        next(new Error('not an admin'))
    }
})

router.delete('/:productId/tags/:tagId', function(req, res, next) {
    if (req.user.isAdmin) {
        Tag.findById(req.params.tagId)
            .then(function(tag) {
                return req.product.removeTag(tag);
            })
            .then(function() {
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
                productId: req.product.id
            },
            order: '"createdAt" DESC',
            limit: req.query.reviewCount,
        })
        .then(function(reviews) {
            res.send(reviews)
        })
        .catch(next)
})
