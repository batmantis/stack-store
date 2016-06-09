app.factory('CartFactory', function($http, $kookies, $state){
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
			$kookies.set(productId, quantity, { path: '/' })
		}
	}
})