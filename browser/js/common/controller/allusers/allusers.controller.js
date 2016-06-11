app.controller('UsersCtrl', function($scope, userFactory, $log){
	userFactory.getAll()
	.then(function(users){
		console.log('hi')
		$scope.users = users
	})

	$scope.$watch('users', function(){
		$scope.users.save()
	})
})