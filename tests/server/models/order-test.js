'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
    logging: false
});

require('../../../server/db/models/order')(db);
require('../../../server/db/models/product')(db);

var Order = db.model('order');
var Product = db.model('product');

describe('Order model', function() {

    // beforeEach('Sync DB', function () {
    //    return db.sync({ force: true });
    // });
    var createdOrder;
    beforeEach('sync db', function(done) {
        db.sync({ force: true })
            .then(function() {
                createdOrder = Order.create({
                    address: '2439 Star Route',
                    city: 'Arlington Heights',
                    state: 'IL',
                    zipcode: 60005,
                    billingaddress: '2439 Star Route',
                    billingcity: 'Arlington Heights',
                    billingstate: 'IL',
                    billingzipcode: 60005,
                    creditCard: 5319869385480010,
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
