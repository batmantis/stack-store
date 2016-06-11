'use strict';

app.controller('UsersCtrl', function($scope, userFactory){
	userFactory.getAll()
	.then(users => $scope.users = users)

	$scope.update = userFactory.updateUser

	$scope.delete = userFactory.deleteUser

})