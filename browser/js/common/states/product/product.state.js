app.config(function($stateProvider){
	$stateProvider.state('viewProduct', {
		url: '/product/:productId',
		templateUrl: '/js/common/states/product/viewproduct.html',
    controller: 'productController',
    resolve: {
      product: function($stateParams, productFactory) {

        return productFactory.getProductDetails($stateParams.productId)
        .then(function(data){
          console.log(data)
          return data
        })
        .catch(function(err) {console.log(err)})
      }
    }
	})
})
