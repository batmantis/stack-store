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

	$stateProvider.state('admin.products', {
		url: '/products',
		templateUrl: 'js/common/controller/admin/all.products.html',
		controller: 'ProductsCtrl'
	})

	$stateProvider.state('admin.categories', {
		url: '/catergories',
		templateUrl: 'js/common/controller/admin/all.categories.html',
		controller: 'CatsCtrl'
	})
})
