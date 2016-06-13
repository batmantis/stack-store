app.controller('ConfirmationCtrl', function($scope, $state, $stateParams, orderInfo) {
  $scope.orderId = $stateParams.orderId
  $scope.order = orderInfo
})
