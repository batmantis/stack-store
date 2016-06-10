app.controller('CheckoutCtrl', function(CartFactory, $scope, $kookies, addressFactory, UserFactory, userDetails, $state) {

  $scope.getProducts = function() {
    CartFactory.getCartProducts().then(function(products) {
    products = _.sortBy(products, (product) => product.name)
    $scope.cartProducts = products
    })
  }
  $scope.getProducts()

  $scope.user = userDetails

  $scope.update = function() {
      $state.go($state.current, {}, {reload: true})
  }

})
