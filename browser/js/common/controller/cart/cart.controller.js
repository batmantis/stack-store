app.controller('CartCtrl', function(CartFactory, $scope, $kookies, userDetails) {
  $scope.user = userDetails

  $scope.getProducts = function() {
    CartFactory.getCartProducts().then(function(products) {
    products = _.sortBy(products, (product) => product.name)
    $scope.cartProducts = products
    })
  }
  $scope.getProducts()

  $scope.changeQty = function(productId, qty) {
    // console.log(qty)
    var changedProduct = $scope.cartProducts.filter((product) => product.id === productId)[0]
    changedProduct.cartQuantity = qty
    return CartFactory.changeQty(productId, qty)
  }

  $scope.productQuantity = function(productId) {
    var cartContents = $kookies.get('cart')
    return cartContents[productId]
  }
  $scope.removeFromCart = function(product) {
    CartFactory.removeFromCart(product.id)
    $scope.getProducts()
  }
  $scope.cartIsEmpty = CartFactory.cartIsEmpty

  // console.log($kookies.get('cart'))
})
