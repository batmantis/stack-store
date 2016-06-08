app.config(function($stateProvider){
	$stateProvider.state('search', {
		url: '/search/:name',
		templateUrl: '/js/common/states/products/viewproducts.html',
    controller: 'searchController',
		resolve: {
			products: function($stateParams, searchFactory) {
        console.log($stateParams.name)
				return searchFactory.getProductsBySearch($stateParams.name)
				.then(function(data){
          console.log(data)
					return data
				})
			}
		}
	})
})
