app.controller('userDetailController', function($scope, $log, $state, loggedInUser, UserFactory, addressFactory) {
    if (loggedInUser) {
        $scope.user = loggedInUser;
    } else {
        $state.go('notLoggedIn');
    }

    $scope.delete = function(addressId) {
        addressFactory.deleteAddress(addressId)
            .then(function() {
                $state.go($state.current, {}, { reload: true })
                console.log('deleted')
            })
    }

    $scope.update = function() {
        console.log('i hit update')
        $state.go($state.current, {}, {reload: true})
    }
});
