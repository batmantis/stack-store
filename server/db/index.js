'use strict';
var db = require('./_db');
require('./models/order')(db);
require('./models/product')(db);
require('./models/tag')(db);
require('./models/user')(db);
require('./models/review')(db);
require('./models/address')(db);
require('./models/billing')(db);
require('./models/product.orders.js')(db);

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

ProductOrders.afterCreate(function(productOrders){
	Order.findbyId({
		where:{
			id: productOrders.orderId
		}
	})
	.then(function(order){
		order.orderTotal += productOrders.getSubtotal();
		return order.save();
	});
});

module.exports = db;
