app.config(function ($stateProvider) {
	$stateProvider.state('checkout', {
		url: '/checkout',
		templateUrl: '/js/common/states/checkout/checkout.html',
		controller: 'CheckoutCtrl',
		resolve: {
			userDetails: function (UserFactory) {
				return UserFactory.getLoggedInUser();
			}
		}
	});
});
