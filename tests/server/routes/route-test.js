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

require('../../../server/db/models/order')(db);
require('../../../server/db/models/product')(db);
require('../../../server/db/models/tag')(db);
require('../../../server/db/models/user')(db);
require('../../../server/db/models/review')(db);
require('../../../server/db/models/address')(db);
require('../../../server/db/models/billing')(db);
require('../../../server/db/models/product.orders.js')(db);

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

var app = require('../../../server/app')(db);
var agent = require('supertest').agent(app);

var product1 = {
  name: 'Rib',
  price: '0.50',
  brand: 'Nike',
  description: 'Just eat it',
  quantity: '1'
};

describe('Product Route:', function () {

  beforeEach('Sync DB', function () {
      return db.sync({force: true});
  });

  describe('GET /api/product', function () {
    beforeEach(function () {
      return Product.create(product1)
      .then(function (product) {
        newId = product.id;
      })
      .catch(console.error.bind(console));
    });

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
    beforeEach(function () {
      return Product.create(product1)
      .then(function (product) {
        newId = product.id;
      })
      .catch(console.error.bind(console));
    });

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
          description: 'Just eat it'
        }
      })
      .then(function (product) {
        product.destroy();
      })
      .catch(console.error.bind(console));
    });

    it('posts to Product', function (done) {
      agent
        .post('/api/product/')
        .send(product1)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.body.description).to.equal('Just eat it');
            done();
          }
        });

    });
  });

  describe('PUT and DELETE', function () {
    describe('PUT /api/product', function () {
      var product1 = {
        name: 'Rib',
        price: '0.50',
        brand: 'Nike',
        description: 'Just eat it',
        quantity: '1'
      };
      var newId;
      var admin = {
        email: 'testing@fsa.com',
        password: 'password',
        isAdmin: true
      };

      beforeEach(function () {
        User.create(admin)
        .then(function () {
          return Product.create(product1)
        })
        .then(function (product) {
          newId = product.id;
        })
        .catch(console.error.bind(console));
      });

      beforeEach(function (done) {
        agent.post('/login')
        .send(admin)
        .end(done)
      });

      afterEach(function () {
        return Product.findOne({
          where: {
            description: 'Just eat it'
          }
        })
        .then(function (product) {
          product.destroy();
        })
        .catch(console.error.bind(console));
      });

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
      var product1 = {
        name: 'Rib',
        price: '0.50',
        brand: 'Nike',
        description: 'Just eat it',
        quantity: '1'
      };
      var newId;

      var admin = {
        email: 'testing@fsa.com',
        password: 'password',
        isAdmin: true,
      };

      beforeEach(function () {
        User.create(admin)
        .then(function () {
          return Product.create(product1)
        })
        .then(function (product) {
          newId = product.id;
        })
        .catch(console.error.bind(console));
      });

      beforeEach(function (done) {
        agent.post('/login')
        .send(admin)
        .end(done)
      });

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
