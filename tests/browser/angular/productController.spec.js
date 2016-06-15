'use strict';

function randomNum(upperBound) {
    return Math.floor(Math.random() * upperBound);
}

describe('tagController', function() {
    beforeEach(module('StackStore'));

    var $controller;
    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('$scope.getAvgRating()', function() {
        it('gets average reviews tied to a product', function() {
            var $scope = {};

            var controller = $controller('tagController', { $scope: $scope,
                'products':products
                 });

            var products = {
                product: {
                    reviews: [{
                        id: randomNum(10),
                        title: 'review' + randomNum(100),
                        rating: 5
                    }, {
                        id: randomNum(10),
                        title: 'review' + randomNum(100),
                        rating: 4
                  }]
                }
            };

            $scope.getAvgRating(products.product);

            expect(products.product.avgReview).to.equal(4.5);

        })
    })
})
