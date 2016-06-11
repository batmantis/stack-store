app.config(function ($stateProvider) {
	$stateProvider.state('userDetail', {
		url: '/user/info',
		templateUrl: '/js/common/states/user/detail/user.detail.html',
		controller: 'userDetailController',
		resolve: {
			loggedInUser: function (userFactory) {
				return userFactory.getLoggedInUser();
			}
		}
	});
});