app.factory('suggestFactory', function ($http) {
	return {
		getofProduct: function (productId) {
			return $http.get('/api/order/suggestions/' + productId)
			.then(function (res) {
				return res.data;
			});
		}
	}
});