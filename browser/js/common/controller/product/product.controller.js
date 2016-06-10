app.controller('productController', function(productFactory, $scope, product, $state, Session, reviewFactory, CartFactory) {
    $scope.product = product;

    $scope.addReview = function(review, productId) {
        reviewFactory.addReview(review, productId)
            .then(function(review) {
                $scope.product.reviews.unshift(review)
            })
    };

    $scope.getNumber = function(num){
        var amount = +this.product.quantity;
        if(amount < 10){
            dropdown(amount);
        }
        return dropdown(num);
    }

    $scope.addToCart = CartFactory.addToCart;

    $scope.user = Session.user;

    $scope.qtyArray = CartFactory.getQty(product.quantity);


})
