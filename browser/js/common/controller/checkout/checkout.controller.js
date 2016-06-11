app.controller('CheckoutCtrl', function(CartFactory, $scope, $kookies, addressFactory, userFactory, userDetails, $state) {

  $scope.getProducts = function() {
    CartFactory.getCartProducts().then(function(products) {
    products = _.sortBy(products, (product) => product.name)
    $scope.cartProducts = products
    })
  }
  $scope.getProducts()

  $scope.user = userDetails

  $scope.update = function(address) {
      $state.go($state.current, {}, {reload: true})
      $scope.setAddressId()
  }

  $scope.order = {
    addressId: null,
    billingId: null,
    address: null,
    billing: null,
    email: null
  }


  $scope.setAddressId = function(address) {
    if ($scope.user.addresses) $scope.order.addressId = $scope.user.addresses[0].id
  }

  $scope.setAddressId()

  $scope.checkout = CartFactory.checkout

})
