app.config(function($stateProvider){
	$stateProvider.state('tag', {
		url: '/:tagId',
		templateUrl: '/js/common/states/tag/viewproducts.html',
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