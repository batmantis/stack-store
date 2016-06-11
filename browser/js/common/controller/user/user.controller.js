app.controller('userDetailController', function($scope, $log, $state, loggedInUser, UserFactory, billingFactory, addressFactory) {

    if (loggedInUser) {
        $scope.user = loggedInUser;
    } else {
        $state.go('notLoggedIn');
    }

    function reloadState () {
        $state.go($state.current, {}, { reload: true });
    }

    $scope.deleteAddress = function(addressId) {
        addressFactory.deleteAddress(addressId)
        .then(function() {
            reloadState();
            return null;
        })
        .catch($log.error);
    }

    $scope.deleteBilling = function (billingId) {
        billingFactory.deleteBilling(billingId)
        .then(function () {
           reloadState();
           return null;
        })
        .catch($log.error);
    }

    $scope.update = function() {
        reloadState();
    }
});
