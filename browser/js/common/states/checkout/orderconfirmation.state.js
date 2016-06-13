app.config(function ($stateProvider) {
	$stateProvider.state('orderConfirmation', {
		url: '/orderconfirmation/:orderId',
		templateUrl: '/js/common/states/checkout/orderconfirmation.html',
		controller: 'ConfirmationCtrl',
		resolve: {
			orderInfo: function ($stateParams, orderFactory) {
				return orderFactory.getOne($stateParams.orderId)
			}
		}
	});
});
