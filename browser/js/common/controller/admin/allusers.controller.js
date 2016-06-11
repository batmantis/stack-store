'use strict';

app.controller('UsersCtrl', function($scope, UserFactory, $log){
	UserFactory.getAll()
	.then(function(users){
		console.log('hi')
		$scope.users = users
	})
})