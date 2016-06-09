app.factory('productFactory', function($http) {
  return {
    getProductDetails: function(productId) {
        return $http.get('/api/product/' + productId)
        .then(function(product) {
          return $http.get('/api/product/' + productId + '/reviews?reviewCount=5')
          .then(function(reviews) {
            product.data.reviews = reviews.data
            return product.data
          })
        })
        .catch(console.log)
    },
    getProduct: function(productId) {
        return $http.get('/api/product/' + productId)
      .then(function(product) {
        return product.data
      })

    }
  }
})
