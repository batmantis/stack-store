'use strict';

var router = require('express').Router()
var db = require('../../../db')
var Review = db.model('review')
var User = db.model('user')
var Promise = require('sequelize').Promise

module.exports = router

router.param('reviewId', function(req, res, next, reviewId) {
    Review.findById(reviewId)
        .then(function(review) {
            if (review) {
                req.review = review;
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

//Get all reviews
router.get('/', function(req, res, next) {
    Review.findAll()
        .then(function(reviews) {
            res.send(reviews)
        })
        .catch(next)
})

//Get one review by id
router.get('/:reviewId', function(req, res, next) {
    res.send(req.review)
})

//Create a review for a review
router.post('/', function(req, res, next) {
    if (req.user) {
        var findingUser = User.findById(req.user.id)

        var findingProduct = Product.findById(req.body.productId)

        var creatingReview = Review.create(req.body)

        Promise.all([findingUser, findingProduct, creatingReview])
            .spread(function(user, product, review) {
                user.addReview(review)
                product.addReview(review)
                res.send(review)
            })

    } else {
        res.sendStatus(401)
    }
})
