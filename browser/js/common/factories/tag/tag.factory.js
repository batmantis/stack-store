app.factory('tagFactory', function($http){
	function returnData (res) {
		return res.data;
	}

	return {
		getAll: function(){
			return $http.get('/api/tag')
			.then(returnData)
		},

		addTag: function(id, tagId){
			return $http.put('/api/product/' + id + '/tags/' + tagId)
			.then(returnData)
		},

		removeTag: function(id, tagId){
			return $http.delete('/api/product/' + id + '/tags/' + tagId)
			.then(returnData)
		}
	}
})