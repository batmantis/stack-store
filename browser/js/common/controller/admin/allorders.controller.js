'use strict';

app.controller('OrdersCtrl', function($scope, orderFactory) {
	orderFactory.getAll()
	.then(orders => $scope.orders = orders)

})