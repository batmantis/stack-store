'use strict';

app.config(function($stateProvider){
	$stateProvider.state('admin', {
		url: '/admin',
		templateUrl: '/js/common/states/admin/admin.page.html',
		controller: 'adminCtrl'
	})

	$stateProvider.state('admin.user', {
		url: '/users',
		templateUrl: 'js/common/directives/admin/all.users.html',
		controller: 'UsersCtrl'
		// resolve: {
		// 	users: function(userFactory) {
		// 		return userFactory.getAll()
		// 		.then(function(users){
		// 			return users
		// 		})
		// 	}
		// }
	})
})