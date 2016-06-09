app.controller('userDetailController', function ($scope, $log, $state, loggedInUser, addressFactory) {
	if (loggedInUser) {
		$scope.user = loggedInUser;
	} else {
		$state.go('notLoggedIn');
	}

	$scope.delete = function(addressId) {
		addressFactory.deleteAddress(addressId)
		.then(function(){
			$scope.$evalAsync();
		})
	}

	$scope.update = function() {
		console.log('i went here')
		$scope.$evalAsync();
	}
});