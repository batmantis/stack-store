app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, userFactory, AuthService, $state) {

    $scope.signup = {};

    $scope.sendSignUp = function (loginInfo) {
        console.log(loginInfo);
        UserFactory.addUser(loginInfo)
            .then(function (user) {
                console.log(user);
                return AuthService.login(loginInfo)
                    .then(function () {
                    $state.go('home');
                })
            })
            .catch(function () {
                $scope.error = 'Email already exists.';
        });
    }

    $scope.minlength = 7

});