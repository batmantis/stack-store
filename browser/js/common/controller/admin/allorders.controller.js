'use strict';

app.controller('OrdersCtrl', function($scope, orderFactory) {
    orderFactory.getAll()
        .then(orders => $scope.orders = orders)

    $scope.filter = 'All'

    $scope.$watch('filter', function(newVal) {
        if (newVal === 'All') {
            orderFactory.getAll()
                .then(orders => $scope.orders = orders)
        } else {
            orderFactory.getAllFilter(newVal)
                .then(orders => $scope.orders = orders)
        }
    })

    $scope.updateStatus = orderFactory.updateStatus
})
