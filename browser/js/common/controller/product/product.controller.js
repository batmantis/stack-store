app.controller('productController', function(productFactory, $rootScope, $scope, product, $state, AuthService, Session, reviewFactory) {
    $scope.product = product


    $scope.addReview = function(review, productId) {
        reviewFactory.addReview(review, productId)
            .then(function(review) {
                $scope.product.reviews.unshift(review)
            })
    }

    $scope.user = Session.user;

})
