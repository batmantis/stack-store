app.config(function($stateProvider){
	$stateProvider.state('search', {
		url: '/search/:name',
		templateUrl: '/js/common/states/products/viewproducts.html',
    	controller: 'searchController',
		resolve: {
			products: function($stateParams, searchFactory) {
				return searchFactory.getProductsBySearch($stateParams.name)
				.then(function(data){
					return data
				})
			}
		}
	})
})
