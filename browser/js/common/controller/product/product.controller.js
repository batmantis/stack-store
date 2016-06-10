app.controller('productController', function(productFactory, $scope, product, $state, Session, reviewFactory, CartFactory) {
    $scope.product = product

    $scope.addReview = function(review, productId) {
        reviewFactory.addReview(review, productId)
            .then(function(review) {
                $scope.product.reviews.unshift(review)
            })
    }

    $scope.addToCart = CartFactory.addToCart

    $scope.user = Session.user;

})
