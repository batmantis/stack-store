'use strict';

/* Security and Hashing Tests located in './user-test.js' */

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

describe('User Model', function () {

  beforeEach(function () {
    return db.sync({force: true});
  });

  var user1 = {
    email: 'user1@gmail.com',
    password: '1'
  }

  it('creates an instance on the User Model', function () {
    return User.create(user1)
    .then(function (user) {
      expect(user.email).to.equal('user1@gmail.com');
    });
  });

  it('requires email', function () {
    var user = User.build({
      password: '2'
    });

    return user.validate()
      .then(function(result) {
        expect(result).to.be.an('object');
        expect(result.message).to.equal('notNull Violation: email cannot be null');
      });
  });

  it('changes the password in database', function () {
    return User.create(user1)
    .then(function (user) {
      expect(user.password).to.not.equal(user1.password);
    });

  });

  it('defaults isAdmin to false', function () {
    return User.create(user1)
    .then(function (user) {
      expect(user.isAdmin).to.equal(false);
    });

  });

  it('Order, Address, Billing tables', function() {
    var order1 = {
          orderTotal: 5.00,
          orderStatus: 'Created',
        },
        address1 = {
          name: 'John',
          address: '1 Fullstack Avenue',
          city: 'Scope City',
          state: 'JS',
          zipcode: '13371'
        },
        billing1 = {
          name: 'Dave',
          address: '2 Fullstack Avenue',
          city: 'Scope City',
          state: 'ES',
          zipcode: '80800',
          creditCard: 4716747248084496
        };
    
      return Promise.all([Order.create(order1), Address.create(address1), Billing.create(billing1)])
      .spread(function(order, address, billing) {
        expect(order.orderTotal).to.equal(5.00);
        expect(address.city).to.equal('Scope City');
        expect(billing.state).to.equal('ES');
      })
  });

  it('User hasMany Order, Address, Billing', function() {
    var user,
        order1 = {
          orderTotal: 5.00,
          orderStatus: 'Created',
        },
        address1 = {
          name: 'John',
          address: '1 Fullstack Avenue',
          city: 'Scope City',
          state: 'JS',
          zipcode: '13371'
        },
        billing1 = {
          name: 'Dave',
          address: '2 Fullstack Avenue',
          city: 'Scope City',
          state: 'ES',
          zipcode: '80800',
          creditCard: 4716747248084496
        };
      return User.create(user1)
      .then(function(userResult) {
        user = userResult;
        return Promise.all([Order.create(order1), Address.create(address1), Billing.create(billing1)]);
      })
      .spread(function(order, address, billing) {
        return Promise.all([user.addOrders([order]), user.addAddress([address]), user.addBilling([billing])]);
      })
      .then(function () {
        return Promise.all([Order.findOne(), Address.findOne(), Billing.findOne()]);
      })
      .spread(function (order, address, billing) {
        expect(order.userId).to.equal(1);
        expect(address.userId).to.equal(1);
        expect(billing.userId).to.equal(1);
      });
  });

});