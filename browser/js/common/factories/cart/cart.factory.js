app.factory('CartFactory', function($http, $kookies, $state, productFactory, $q){
	return {
		addToCart: function(productId, quantity){
			quantity = +quantity || 1

			if($kookies.get('cart')){
				var cartContents = $kookies.get('cart');
				// console.log("cookie exists");
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
			// console.log($kookies.get('cart'));
		},
		removeFromCart: function(productId){
			var cartContents = $kookies.get('cart')
			delete cartContents[productId]
			$kookies.set('cart', cartContents, { path: '/' });
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
		},
		cartIsEmpty: function() {
			var cartContents = $kookies.get('cart')
			return _.isEmpty(cartContents)
		},
		checkout: function(order) {
			var cartContents = $kookies.get('cart')
			order.cart = cartContents
			$http.post('/api/order', order)
			.then(function(order) {
					$kookies.set('cart', {}, { path: '/' });
					console.log(order.data.id)
					$state.go('orderConfirmation', {orderId: order.id})
			})
		},
		displayTotal: function(products) {
			var cartContents = $kookies.get('cart')
			var total = 0
			if (products) {
				products.forEach(function(product) {
				 	total += product.price * cartContents[product.id]
				})
			}
			return total.toFixed(2)
		},

 		getQty: function(num){
 			if(num > 10){num =10};
 			var arr = new Array(num);
 			for(var i = 0; i < num; i++){
 			    arr[i] = i+1;
 			}
 			return arr;
  		}
	}
})
