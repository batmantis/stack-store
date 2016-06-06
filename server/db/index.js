'use strict';
var db = require('./_db');
var Order = require('./models/order');
var Product = require('./models/product');
var Tag = require('./models/tag');
var User = require('./models/user');
var Review = require('./models/review');

Product.hasMany(Tag);
Order.hasMany(Product);
User.hasMany(Order);
Product.hasMany(Review);
Review.belongTo(User, {as: 'userReview'});

module.exports = db;

require('./models/user')(db);

