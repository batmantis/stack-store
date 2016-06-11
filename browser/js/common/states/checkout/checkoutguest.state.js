app.config(function ($stateProvider) {
	$stateProvider.state('checkoutGuest', {
		url: '/checkoutguest',
		templateUrl: '/js/common/states/checkout/checkoutguest.html',
		controller: 'CheckoutCtrl',
		resolve: {
			userDetails: function (userFactory) {
				return userFactory.getLoggedInUser();
			}
		}
	});
});
