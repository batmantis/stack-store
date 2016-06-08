app.config(function($stateProvider){
	$stateProvider.state('tag', {
		url: '/category/:tagId',
		templateUrl: '/js/common/states/products/viewproducts.html',
		controller: 'tagController',
		resolve: {
			products: function($stateParams, sidebarFactory) {
				return sidebarFactory.getProductsByTag($stateParams.tagId)
				.then(function(data){
					return data
				})
			}
		}
	})
})
