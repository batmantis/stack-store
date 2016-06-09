app.factory('CartFactory', function($http, $kookies, $state, productFactory, $q){
	return {
		addToCart: function(productId, quantity){
			quantity = +quantity || 1

			if($kookies.get('cart')){
				var cartContents = $kookies.get('cart');
				console.log("cookie exists");
				if(cartContents[productId]) {
					var amount = +cartContents[productId];
					cartContents[productId] = amount + quantity;
				}else{
				cartContents[productId] = quantity;
				}
				$kookies.set('cart', cartContents, { path: '/' });
				$state.go('cart');
			}else{
				var cartContents = {};
				cartContents[productId] = quantity;
				$kookies.set('cart', cartContents, { path: '/' });
				$state.go('cart');
			}

			console.log($kookies.get('cart'));
		},
		removeFromCart: function(productId){
			$kookies.remove(productId);
		},
		changeQty: function(productId, quantity){
			var cartContents = $kookies.get('cart')
			quantity = +quantity
			cartContents[productId] = quantity
			$kookies.set('cart', cartContents, { path: '/' });
		},
		getCartProducts: function() {
			var cartContents = $kookies.get('cart')
			var products = Object.keys(cartContents).map((el) => productFactory.getProduct(el))
			return $q.all(products).then(function(productDetails) {
				productDetails.forEach((el) => {
				el.cartQuantity = cartContents[el.id]
				return el
				})
				return productDetails
			})
		}
	}
})
