app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, userFactory) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            return userFactory.getLoggedInUser()
        })
        .then(function(user) {
            if (user.resetPassword) {
                $state.go('resetpassword')
            } else {
                $state.go('home')
            }
        })
        .catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
