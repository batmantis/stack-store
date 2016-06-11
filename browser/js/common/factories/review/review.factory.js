app.factory('reviewFactory', function($http){
	return {
		addReview: function(review, productId){
			return $http.post('/api/review/product/' + productId, review)
			.then(function(review){
				return review.data
			})
		},

		getAll: function() {
			return $http.get('/api/review/')
			.then(review => review.data)
		}
	}
})