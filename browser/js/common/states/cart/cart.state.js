app.config(function ($stateProvider) {
	$stateProvider.state('cart', {
		url: '/cart',
		templateUrl: '/js/common/states/cart/cart.html',
		controller: 'CartCtrl',
		resolve: {
			userDetails: function (userFactory) {
				return userFactory.getLoggedInUser();
			}
		}
	});
});
