app.factory('searchFactory', function($http) {
  return {
    getProductsBySearch: function(query) {
      return $http.get('/api/product?name=' + query)
      .then(function(products) {
        return products.data
      })
    }
  }
})
