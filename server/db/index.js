'use strict';
var db = require('./_db');
require('./models/order')(db);
require('./models/product')(db);
require('./models/tag')(db);
require('./models/user')(db);
require('./models/review')(db);

var Product = db.model('product');
var Tag = db.model('tag');
var Order = db.model('order');
var User = db.model('user');
var Review = db.model('review');

Product.hasMany(Tag);
Order.belongsToMany(Product, {through: 'ProductOrders'});
User.hasMany(Order);
Product.hasMany(Review);
User.hasMany(Review);

module.exports = db;
