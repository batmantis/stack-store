app.config(function ($stateProvider) {
	$stateProvider.state('orderConfirmation', {
		url: '/orderconfirmation/:order',
		templateUrl: '/js/common/states/checkout/orderconfirmation.html',
		controller: 'ConfirmationCtrl'
	});
});
