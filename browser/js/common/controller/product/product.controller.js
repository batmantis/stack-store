app.controller('productController', function(productFactory, $scope, product, $state, Session, reviewFactory, CartFactory) {
    $scope.product = product;

    $scope.addReview = function(review, productId) {
        reviewFactory.addReview(review, productId)
            .then(function(review) {
                $scope.product.reviews.unshift(review)
            })
    };

    $scope.number = 10;


    $scope.getNumber = function(num){
        var amount = +this.product.quantity;
        if(amount < 10){
            return new Array(amount);
        }
        return new Array(num);
    }

    $scope.addToCart = CartFactory.addToCart;

    $scope.user = Session.user;


})
