'use strict';

/* Security and Hashing Tests located in './user-test.js' */


/* IMPORTANT NOTE



LOOK HERE! 



RUN 'NODE SEED' AFTER TESTING



*/

var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/fsg';
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


var app = require('../../../server/app')(db);
var agent = require('supertest').agent(app);

var product1 = {
  name: 'Rib',
  price: '0.50',
  brand: 'Nike',
  description: 'Just eat it',
  quantity: '1'
};

var product2 = {
  name: 'Wing',
  price: '0.50',
  brand: 'Delta',
  description: 'We like to go fast',
  quantity: '2'
};

var newId;
var admin = {
  email: 'testing@fsa.com',
  password: 'password',
  isAdmin: true
};

describe('Product Route:', function () {

  beforeEach('Sync DB', function () {
      return db.sync({force: true})
      .then(function () {
        return User.create(admin)
      });
  });

  beforeEach(function () {
    return Product.create(product1)
    .then(function (product) {
      newId = product.id;
    })
  });

  afterEach(function () {
    return Product.findOne({
      where: {
        brand: 'Nike'
      }
    })
    .then(function (product) {
      if (product) {
        return product.destroy();
      }
    })
  });

  describe('GET /api/product', function () {
    it('responds with an array via JSON', function (done) {
      agent
        .get('/api/product/')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an.instanceOf(Array);
            done();
          }
        });

    });
  });

  describe('GET /api/product/1 ', function () {
    it('responds with one product', function (done) {
      agent
        .get('/api/product/1')
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.body.id).to.equal(1);
            done();
          }
        });
    });
  });

  describe('POST /api/product', function () {
    afterEach(function () {
      return Product.findOne({
        where: {
          description: 'We like to go fast'
        }
      })
      .then(function (product) {
        if (product) return product.destroy();
      })
    });

    it('posts to Product', function (done) {
      agent
        .post('/api/product/')
        .send(product2)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.body.description).to.equal('We like to go fast');
            done();
          }
        });
    });

    it('persists in the database', function (done) {
      agent
        .post('/api/product/')
        .send(product2)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            Product.findOne({
              where: {
                description: 'We like to go fast'
              }
            })
            .then(function (product) {
              expect(product.description).to.equal('We like to go fast');
              done();
            })
          }
        });
    });
  });

  describe('PUT and DELETE', function () {

    beforeEach(function (done) {
      agent.post('/login')
      .send(admin)
      .end(done)
    });

    describe('PUT /api/product', function () {

      it('updates a Product as Admin', function (done) {
        agent
          .put('/api/product/' + newId)
          .send({ name: 'Packing Peanut' })
          .expect(200)
          .end(function (err, res) {
            if (err) {
              done(err);
            } else {
              expect(res.body.name).to.equal('Packing Peanut');
              done();
            }
          });
      });
    });

    describe('DELETE /api/product', function () {
      it('deletes a Product', function (done) {
        agent
          .delete('/api/product/' + newId)
          .expect(204)
          .end(function (err, res) {
            if (err) {
              done(err);
            } else {
              expect(res.body.name).to.equal(undefined);
              done();
            }
          });

      });

    });
  })
console.log('THESE TESTS CLEAR THE DATABASE PLEASE RESEED');
console.log('THESE TESTS CLEAR THE DATABASE PLEASE RESEED');
});
