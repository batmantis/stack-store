app.factory('userFactory', function ($http) {
	function returnData (res) {
		return res.data;
	}

	return {
		getAll: function () {
			return $http.get('/api/user/')
			.then(returnData);
		},
		getOne: function (id) {
			return $http.get('/api/user/' + id)
			.then(returnData);
		},
		addUser: function (dataObj) {
			return $http.post('/api/user/', dataObj)
			.then(returnData);
		},
		updateUser: function (id, dataObj) {
			return $http.put('/api/user/' + id, dataObj)
			.then(returnData);
		},
		deleteUser: function (id) {
			return $http.delete('/api/user/' + id);
		},
		getLoggedInUser: function () {
			return $http.get('/api/user/info')
			.then(returnData);
		},
		resetPassword: function(id, password) {
			return $http.put('/api/user/' + id, password)
			.then(returnData)
		}
	};
});
