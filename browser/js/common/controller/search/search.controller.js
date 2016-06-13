app.controller('searchController', function($scope, searchFactory, products){
	$scope.products = products
	
	$scope.priceFilter = null;

	$scope.getAvgRating = function(product){

		var reviews = product.reviews

		var sum = 0;
		reviews.forEach(function(review){
			sum += review.rating;
		});
		
		product.avgReview = sum/reviews.length;

		return product.avgReview;
	}
})
