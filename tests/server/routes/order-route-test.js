// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');
var Promise = Sequelize.Promise;
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
    logging: false
});

//Lines below relations copied from index.js
require('../../../server/db/models/product')(db);
require('../../../server/db/models/tag')(db);
require('../../../server/db/models/user')(db);
require('../../../server/db/models/review')(db);
require('../../../server/db/models/address')(db);
require('../../../server/db/models/billing')(db);
require('../../../server/db/models/product.orders.js')(db);
require('../../../server/db/models/order')(db);




var supertest = require('supertest');

describe('Order Route:', function () {

    var app,Order,Product,Tag,User,Review,Address,Billing,ProductOrders;
    var ordersToAdd = [
        {
            orderTotal: 61.98,

        },
        {
            orderTotal: 612.32,
        }
    ];
    var createOrders = orders.map((order) => Order.createNewOrder(order))

    beforeEach('Sync DB and Create App', function () {
        db.sync({ force: true });
        app = require('../../../server/app')(db);
        Product = db.model('product');
        Tag = db.model('tag');
        Order = db.model('order');
        User = db.model('user');
        Review = db.model('review');
        Address = db.model('address');
        Billing = db.model('billing');
        ProductOrders = db.model('productOrders');

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
    });

	describe('GET to /api/orders', function () {
		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		it('should get all Orders', function (done) {
			Promise.all(createOrders)
			.then(function(orders){
				guestAgent.get('/api/orders/')
				.expect(200)
				.expect(function (res) {
					expect(res.body).to.have.length(2);
					expect(res.body[0].orderTotal.to.equal(612.32));
				})
				.end(done);
			})
			.catch(done);
		});

	});

	describe('Order and Product', function (done) {
		var loggedInAgent,orderInfo,productInfo;

		beforeEach('getOne', function () {
			orderInfo = {
	            orderTotal: 612.32,
	            orderStatus: 'Created'
	        };
	        productInfo = {
	        	name: 'dishwasher',
	        	price: 12.34,
	        	brand: 'fullstack',
	        	description: 'safdfdsfdfdsfdsfa',
	        	quantity: 2
	        };
		});

		it('should have an association between orders and products', function(done){
			Promise.all([Product.create(productInfo), Order.create(orderInfo)])
			.spread(function (product, order) {
				return order.addProducts([product]);
			})
			.then(function (assoc) {
				var assoc = assoc[0][0];
				return Product.findOne({
					where: {
						id: assoc.productId
					}
				});
	        })
	        .then(function (product) {
	        	expect(product.name).to.equal('dishwasher');
	        	done();
	        })
			.catch(done);
		});
	});

	describe('GET to /api/orders/:orderId', function () {
		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		it('should get one order', function (done) {
			Order.bulkCreate(ordersToAdd, {returning:true})
			.then(function(orders){
				guestAgent.get('/api/orders/1')
				.expect(200)
				.expect(function (res) {
					expect(res.body.orderTotal).to.equal(612.32);
				})
				.end(done);
			})
			.catch(done);
		});

	});

  //Do not work on until order route changes are commited
	describe('POST to /api/orders/', function () {
		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		xit('should respond with the posted order', function (done) {
			Order.bulkCreate(ordersToAdd, {returning:true})
			.then(function(orders){
				var orderInfo = {
		            orderTotal: 61212.23,
		            orderStatus: 'Created'
		        };
				guestAgent.post('/api/orders', orderInfo)
				.expect(200)
				.expect(function (res) {
					expect(res.body.orderTotal).to.equal(61212.23);
				})
				.end(done);
			})
			.catch(done);
		});

		xit('should update the database', function (done) {
			Order.bulkCreate(ordersToAdd, {returning:true})
			.then(function(orders){
				var orderInfo = {
		            orderTotal: 612.32,
		            orderStatus: 'Created'
		        };
				guestAgent.post('/api/orders', orderInfo);
				return Order.findAll()
			})
			.then(function (orders) {
				expect(orders).to.have.length(3)
				.end(done);
			})
			.catch(done);
		});

	});

	describe('PUT to /api/orders/', function () {
		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		xit('should respond with the updated order', function (done) {
			Order.bulkCreate(ordersToAdd, {returning:true})
			.then(function(orders){
				guestAgent.put('/api/orders/2', {orderTotal: 123.23})
				.expect(200)
				.expect(function (res) {
					expect(res.body).to.equal(123.23)
				})
				.end(done);
			})
			.catch(done);
		});

		xit('should update the database', function (done) {
			Order.bulkCreate(ordersToAdd, {returning:true})
			.then(function(orders){
				guestAgent.put('/api/orders/2', {orderTotal: 321.12});
				return Order.findOne({
					where: {
						id: 2
					}
				})
			})
			.then(function (order) {
				expect(order.orderTotal).to.eql(321.12)
				.end(done);
			})
			.catch(done);
		});

		it('should respond with an error for an order that doesn\'t exist', function (done) {
			Order.bulkCreate(ordersToAdd, {returning:true})
			.then(function(orders){
				guestAgent.put('/api/orders/10', {orderTotal: 321.12})
				.expect(404)
				.end(done);
			})
			.catch(done);
		});

	});

	describe('DELETE to /api/orders/', function () {
		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		it('should delete orders', function (done) {
			Order.bulkCreate(ordersToAdd, {returning:true})
			.then(function(orders){
				guestAgent.delete('/api/orders/2')
				.expect(201)
				.end(done);
			})
			.catch(done);
		});

		it('should delete in a way that persists', function (done) {
			Order.bulkCreate(ordersToAdd, {returning:true})
			.then(function(orders){
				guestAgent.delete('/api/orders/2')
				return Order.findAll();
			})
			.then(function (orders) {
				expect(orders).to.have.length(1)
				.end(done);
			})
			.catch(done);
		});

		it('respond with an error if order doesn\'t exist', function (done) {
			Order.bulkCreate(ordersToAdd, {returning:true})
			.then(function(orders){
				guestAgent.put('/api/orders/7', {orderTotal: 321.12})
				.expect(404)
				.end(done)
			})
			.catch(done);
		});

	});
});
