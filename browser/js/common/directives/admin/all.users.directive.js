app.directive('allUsers', function(UserFactory){
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'js/common/directives/admin/all.users.html',
		link: function($scope, iElm, iAttrs, controller) {
			UserFactory.getAll()
			.then(function(users){
				$scope.users = users
			})
		}
	};
});