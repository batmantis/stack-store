app.factory('billingFactory', function($http) {
    return {
        saveBilling: function(billingObj) {
            return $http.post('/api/billing', billingObj)
                .then(function(billing) {
                    return billing.data
                })
        },

        deleteBilling: function(billingId) {
            return $http.put('/api/billing/' + billingId, {userId: null})

        }
    }
})
