app.controller('userDetailController', function ($scope, $log, $state, loggedInUser) {
	if (loggedInUser) {
		$scope.user = loggedInUser;
	} else {
		$state.go('notLoggedIn');
	}
});