'use strict';

app.config(function($stateProvider){
	$stateProvider.state('admin', {
		url: '/admin',
		templateUrl: '/js/common/states/admin/admin.page.html',
		controller: 'adminCtrl'
	})

	$stateProvider.state('admin.users', {
		url: '/users',
		templateUrl: 'js/common/directives/admin/all.users.html',
		controller: 'UsersCtrl'
	})

	$stateProvider.state('admin.orders', {
		url: '/users',
		templateUrl: 'js/common/directives/admin/all.users.html',
		controller: 'OrdersCtrl'
	})

	$stateProvider.state('admin.reviews', {
		url: '/reviews',
		templateUrl: 'js/common/directives/admin/all.users.html',
		controller: 'ReviewCtrl'
	})
})