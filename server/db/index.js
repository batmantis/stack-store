'use strict';
var db = require('./_db');
require('./models/user')(db);
require('./models/product')(db);
require('./models/tag')(db);
require('./models/review')(db);
require('./models/address')(db);
require('./models/billing')(db);
require('./models/product.orders.js')(db);
require('./models/order')(db);

var Product = db.model('product');
var Order = db.model('order');
var Tag = db.model('tag');
var User = db.model('user');
var Review = db.model('review');
var Address = db.model('address');
var Billing = db.model('billing');
var ProductOrders = db.model('productOrders');

Product.belongsToMany(Tag, {through: 'TagProducts'});
Tag.belongsToMany(Product, {through: 'TagProducts'});
Order.belongsToMany(Product, {through: ProductOrders});
Product.belongsToMany(Order, {through: ProductOrders});
User.hasMany(Order);
User.hasMany(Address);
User.hasMany(Billing);
Product.hasMany(Review);
User.hasMany(Review);
Review.belongsTo(User);
Review.belongsTo(Product);
Order.belongsTo(Address);
Order.belongsTo(Billing);
Order.hasMany(ProductOrders);


module.exports = db;
