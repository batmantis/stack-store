app.factory('orderFactory', function ($http) {
	function returnData (res) {
		return res.data;
	}

	return {
		getAll: function () {
			return $http.get('/api/order/')
			.then(returnData);
		},
		getAllFilter: function(filter) {
			return $http.get('/api/order/filter/' + filter)
			.then(returnData)
		},
		getOne: function (orderId) {
			return $http.get('/api/order/' + orderId)
			.then(returnData);
		},
		getofUser: function (userId) {
			return $http.get('/api/user/' + userId + '/orders')
			.then(returnData);
		},
		updateStatus: function(orderId, status) {
			return $http.put('/api/order/' + orderId, {orderStatus: status})
			.then(returnData)
		}
	};
});