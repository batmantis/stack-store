'use strict';

var router = require('express').Router()
var db = require('../../../db')
var Product = db.model('product')
var Review = db.model('review')
var Tag = db.model('tag')
var _ = require('lodash')

module.exports = router

//Get all products
router.get('/', function(req, res, next) {
    var query = req.query.name ? {name: {$iLike: '%' + req.query.name + '%'}} : {}
    Product.findAll({ where: query })
        .then(function(products) {
            res.send(products)
        })
        .catch(next)
})

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
    var query = req.query.name ? { name: { $iLike: '%' + req.query.name + '%' } } : {}
    Product.findAll({
            where: query,
            include: [{model: Tag}]
        })
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

router.put('/:productId', function (req, res, next) {
    if (req.user.isAdmin) {
        next();
    } else {
        var error = new Error('not an admin');
        error.status = 403;
        next(error);
    }
})

router.delete('/:productId', function (req, res, next) {
    if (req.user.isAdmin) {
        next();
    } else {
        var error = new Error('not an admin');
        error.status = 403;
        next(error);
    }
})

router.put('/:productId', function(req, res, next) {
    req.product.update(req.body)
    .then(function(product) {
        res.send(product)
    })
    .catch(next)
});

router.put('/:productId/tags/:tagId', function(req, res, next) {
    Tag.findById(req.params.tagId)
    .then(function(tag) {
        return req.product.addTag(tag);
    })
    .then(function() {
        res.sendStatus(204)
    })
    .catch(next);
})

router.delete('/:productId', function(req, res, next) {
    req.product.destroy()
    .then(function() {
        res.sendStatus(204)
    })
    .catch(next);
})

router.delete('/:productId/tags/:tagId', function(req, res, next) {
    Tag.findById(req.params.tagId)
    .then(function(tag) {
        return req.product.removeTag(tag);
    })
    .then(function() {
        res.sendStatus(204)
    })
    .catch(next);
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
