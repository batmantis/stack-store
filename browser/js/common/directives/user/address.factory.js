app.factory('addressFactory', function($http) {
    return {
        saveAddress: function(addressObj) {
            return $http.post('/api/address', addressObj)
                .then(function(address) {
                    return address.data
                })
        },

        deleteAddress: function(addressId) {
            return $http.put('/api/address/' + addressId, {userId: null})
            
        }
    }
})
