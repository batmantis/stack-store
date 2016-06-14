app.controller('ResetCtrl', function($scope, userFactory, $state) {
    userFactory.getLoggedInUser()
    .then(user => $scope.user = user)

    $scope.resetPassword = function(){
      userFactory.resetPassword($scope.user.id, {password: $scope.newpassword})
      .then(function(){
        $state.go('home')
      })
    }
})
