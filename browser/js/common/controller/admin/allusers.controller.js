'use strict';

app.controller('UsersCtrl', function($scope, userFactory, $log){
	userFactory.getAll()
	.then(function(users){
		console.log('hi')
		$scope.users = users
	})
})