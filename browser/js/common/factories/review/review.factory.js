app.factory('reviewFactory', function($http){
	return {
		addReview: function(review, productId){
			return $http.post('/api/product/' + productId + '/reviews', review)
			.then(function(review){
				return review.data
			})
		}
	}
})