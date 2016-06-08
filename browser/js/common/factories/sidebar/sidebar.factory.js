app.factory('sidebarFactory', function($http){
	return {
		getAll: function() {
			return $http.get('/api/tag')
			.then(function(tags){
				return tags.data
			})
		},

		getProductsByTag: function(id) {
			return $http.get('/api/tag/' + id)
			.then(function(products){
				return products.data
			})
		}
	};
})