'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
    logging: false
});
var Promise = Sequelize.Promise;

require('../../../server/db/models/user')(db);
require('../../../server/db/models/product')(db);
require('../../../server/db/models/tag')(db);
require('../../../server/db/models/review')(db);
require('../../../server/db/models/address')(db);
require('../../../server/db/models/billing')(db);
require('../../../server/db/models/product.orders.js')(db);
require('../../../server/db/models/order')(db);

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
Review.belongsTo(User);
Review.belongsTo(Product);
Order.belongsTo(Address);
Order.belongsTo(Billing);
Order.hasMany(ProductOrders);

describe('Order model', function() {

    // beforeEach('Sync DB', function () {
    //    return db.sync({ force: true });
    // });
    var createdOrder;
    beforeEach('sync db', function(done) {
        db.sync({ force: true })
            .then(function() {
                createdOrder = Order.create({
                    orderTotal: 61.98,
                    orderStatus: 'Created'
                })
                done();
            })
    });

    describe('Create new order', function() {

        it('should be there', function(done) {
            Order.findOne({
                    where: {
                        orderStatus: 'Created'
                    }
                })
                .then(function(order) {
                    createdOrder.then(function(otherOrder) {
                        expect(otherOrder.orderTotal).to.be.equal(order.orderTotal);
                        done();
                    })
                })
        })
    });



});
