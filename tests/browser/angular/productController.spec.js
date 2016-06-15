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
                        rating: 5,
                        comment: 'Hoodie bushwick butcher, 90\'s thundercats hashtag craft beer gluten-free tote bag tofu direct trade pickled PBR&B. Distillery direct trade PBR&B vice taxidermy. Normcore drinking vinegar cray PBR&B salvia keffiyeh. Ennui jean shorts bitters vinyl fixie, pickled chillwave tofu yuccie raw denim dreamcatcher gluten-free crucifix polaroid drinking vinegar. Biodiesel distillery butcher, affogato disrupt chillwave tumblr mumblecore crucifix retro kombucha twee ennui ugh. Cred pickled ramps, ethical locavore keytar ugh sustainable taxidermy quinoa kickstarter next level semiotics. Cred salvia kale chips beard.'
                    }, {
                        id: randomNum(10),
                        title: 'review' + randomNum(100),
                        rating: 4,
                        comment: 'Vegan waistcoat everyday carry fashion axe lo-fi quinoa salvia, before they sold out butcher mustache biodiesel lomo. Skateboard kitsch four loko tattooed salvia, chicharrones selvage helvetica lo-fi squid dreamcatcher gluten-free kinfolk. Cliche etsy butcher narwhal. Williamsburg gentrify YOLO, leggings aesthetic squid hella shabby chic mustache listicle heirloom thundercats gastropub banjo. Pork belly polaroid tilde four dollar toast, shabby chic food truck chillwave twee selfies health goth scenester squid 8-bit single-origin coffee blog. PBR&B raw denim tousled chia, actually keffiyeh banjo man bun four loko mumblecore yr listicle shabby chic cray readymade. Health goth tattooed asymmetrical chartreuse aesthetic chia hoodie.'
                    }]
                }
            };

            $scope.getAvgRating(products.product);

            expect(products.product.avgReview).to.equal(4.5);

        })
    })
})
