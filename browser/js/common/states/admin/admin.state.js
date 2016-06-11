'use strict';

app.config(function($stateProvider){
	$stateProvider.state('admin', {
		url: '/admin',
		templateUrl: '/js/common/states/admin/admin.page.html',
		controller: 'adminCtrl'
	})

	$stateProvider.state('admin.users', {
		url: '/users',
		templateUrl: 'js/common/controller/admin/all.users.html',
		controller: 'UsersCtrl'
	})

	$stateProvider.state('admin.orders', {
		url: '/orders',
		templateUrl: 'js/common/controller/admin/all.orders.html',
		controller: 'OrdersCtrl'
	})

	$stateProvider.state('admin.reviews', {
		url: '/reviews',
		templateUrl: 'js/common/controller/admin/all.reviews.html',
		controller: 'ReviewCtrl'
	})

	$stateProvider.state('admin.products', {
		url: '/products',
		templateUrl: 'js/common/controller/admin/all.products.html',
		controller: 'ProductsCtrl'
	})
})