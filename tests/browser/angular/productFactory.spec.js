'use strict';

var expect = chai.expect;

function randomNum(upperBound) {
    return Math.floor(Math.random() * upperBound);
}

function makeProduct() {
    return {
        id: randomNum(1000),
        name: 'product' + randomNum(1000),
        imageUrls: ['http://lorempixel.com/400/200/food/' + randomNum(10) + '/'],
        price: randomNum(100),
        brand: 'Great Brand ' + randomNum(1000),
        description: 'This product will fix all your products',
        quantity: randomNum(1000),
        isAvailable: true
    }
}

function makeProducts() {
    let products = new Array(randomNum(8) + 3)
    for (var i = products.length - 1; i >= 0; i--) {
        products[i] = makeProduct()
    }
    return products
}

describe('productFactory', function() {
    beforeEach(module('StackStore'));

    var productFactory, $httpBackend, fakeReqProduct;
    beforeEach(inject(function($injector, _$httpBackend_) {
        productFactory = $injector.get('productFactory');
        $httpBackend = _$httpBackend_;
        fakeReqProduct = makeProduct();
    }))

    afterEach(function() {
        try {
            $httpBackend.verifyNoOutstandingExpectation(false);
            $httpBackend.verifyNoOutstandingRequest();
        } catch (err) {
            this.test.error(err);
        }
    });

    it('getAll products', function(done) {
        var fakeProducts = makeProducts()
        $httpBackend
            .expect('GET', '/api/product/')
            .respond(fakeProducts)

        $httpBackend.expectGET('js/home/home.html').respond('200')

        productFactory.getAll()
            .then(function(products) {
                expect(products).to.deep.equal(fakeProducts)
            })
            .catch(done);
        $httpBackend.flush();
        done();
    })

});
