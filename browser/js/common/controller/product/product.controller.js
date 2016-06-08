app.controller('productController', function(productFactory, $rootScope, $scope, product, $state, AuthService, Session, reviewFactory) {
    $scope.product = product

    // $scope.review = {}

    // $scope.addReview = function(review, productId){
    // 	reviewFactory.addReview(review, productId)
    // 	.then(function(){
    // 		return productFactory.getProductDetails(productId)
    // 		.then(function(product){
    // 			$scope.product = product
    // 		})
    // 	})
    // }

    $scope.addReview = function(review, productId) {
        reviewFactory.addReview(review, productId)
            .then(function(review) {
            	console.log($scope.product.reviews)
                $scope.product.reviews.unshift(review)
            })
    }

    // $scope.user = null;

    $scope.user = Session.user;

    // $scope.isLoggedIn = function () {
    //     return AuthService.isAuthenticated();
    // };

    // var setUser = function () {
    //     AuthService.getLoggedInUser().then(function (user) {
    //         $scope.user = user;
    //     });
    // };

    // setUser();
})
