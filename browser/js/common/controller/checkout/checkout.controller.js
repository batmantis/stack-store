app.controller('CheckoutCtrl', function(CartFactory, $scope, $kookies, addressFactory, userFactory, userDetails, $state) {

  $scope.getProducts = function() {
    CartFactory.getCartProducts().then(function(products) {
    products = _.sortBy(products, (product) => product.name)
    $scope.cartProducts = products
    })
  }

  $scope.total = CartFactory.displayTotal()

  $scope.getProducts()

  $scope.user = userDetails

  $scope.update = function() {
      $state.go($state.current, {}, {reload: true})
      $scope.setAddressId()
  }

  $scope.updateBilling = function() {
      $state.go($state.current, {}, {reload: true})
      $scope.setBillingId()
  }

  $scope.order = {
    addressId: null,
    billingId: null,
    address: null,
    billing: null,
    email: null
  }

  $scope.setBillingId = function() {
    if ($scope.user.billings && $scope.user.billings.length) $scope.order.billingId = $scope.user.billings[0].id
  }

  $scope.setAddressId = function() {
    if ($scope.user.addresses && $scope.user.addresses.length) $scope.order.addressId = $scope.user.addresses[0].id
  }

  $scope.setAddressId()
  $scope.setBillingId()

  $scope.checkout = CartFactory.checkout

  $scope.invalidstripe = false;

  $scope.stripeCallback = function (code, result) {
      if (result.error) {
          $scope.invalidstripe = true;
          $scope.error = result.error.message;
      } else {
        $scope.stripeToken = result.id
        $scope.invalidstripe = false;
        console.log($scope.stripeToken)
      }
  };

  $scope.getstripeToken = function() {
    return $scope.stripeToken
  }

  $scope.getNumber = function() {
    return $scope.number
  }

})
