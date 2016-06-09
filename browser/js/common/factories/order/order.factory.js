app.factory('OrderFactory', function ($http) {
	function returnData (res) {
		return res.data;
	}

	return {
		getAll: function () {
			return $http.get('/api/order/')
			.then(returnData);
		},
		getOne: function (orderId) {
			return $http.get('/api/order/' + id)
			.then(returnData);
		},
		getofUser: function (userId) {
			return $http.get('/api/user/' + userId + '/orders')
			.then(returnData);
		}
	};
});