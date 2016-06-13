app.factory('productFactory', function($http) {
  return {
    getAll: function() {
      return $http.get('/api/product/')
      .then(products => products.data)
    },

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
    },
    addProduct: function(product) {
      return $http.post('/api/product', product)
      .then(product => product.data)
    },
    removePic: function(productId, imageArr, img) {
      console.log('i was here')
      imageArr.splice(imageArr.indexOf(img), 1)
      return $http.put('/api/product/'+ productId, { imageUrls: imageArr })
    },
    addPic: function(productId, imageArr, img) {
      imageArr.push(img)
      return $http.put('/api/product/'+ productId, { imageUrls: imageArr })
    },
  }
})
