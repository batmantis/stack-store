'use strict';

app.controller('ProductsCtrl', function($scope, productFactory){
	productFactory.getAll()
	.then(products => $scope.products = products)

	console.log($scope.products)
})