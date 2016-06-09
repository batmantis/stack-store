app.controller('CartCtrl', function(CartFactory, $scope) {
  CartFactory.getCartProducts().then(function(products) {
    $scope.cartProducts = products
  })
})
