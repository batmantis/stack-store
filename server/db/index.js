'use strict';
var db = require('./_db');

require('./models/product')(db);
require('./models/tag')(db);
require('./models/user')(db);
require('./models/review')(db);
require('./models/address')(db);
require('./models/billing')(db);
require('./models/product.orders.js')(db);
require('./models/order')(db);

var Product = db.model('product');
var Tag = db.model('tag');
var Order = db.model('order');
var User = db.model('user');
var Review = db.model('review');
var Address = db.model('address');
var Billing = db.model('billing');
var ProductOrders = db.model('productOrders');

Product.belongsToMany(Tag, {through: 'TagProducts'});
Tag.belongsToMany(Product, {through: 'TagProducts'});
Order.belongsToMany(Product, {through: ProductOrders});
User.hasMany(Order);
User.hasMany(Address);
User.hasMany(Billing);
Product.hasMany(Review);
User.hasMany(Review);
Order.belongsTo(Address);
Order.belongsTo(Billing);
Order.hasMany(ProductOrders)

// // Don't need this code anymore
// ProductOrders.afterCreate(function(productOrders){
// 	Order.findById(productOrders.orderId)
// 	.then(function(order){
// 		order.orderTotal += productOrders.getSubtotal();
// 		return order.save();
// 	});
// });

module.exports = db;
