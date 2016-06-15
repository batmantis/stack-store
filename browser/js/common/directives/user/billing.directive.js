app.directive('addBilling', function(billingFactory) {
    // Runs during compile
    return {
        scope: {
        	update: '&'
        },
        restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'js/common/directives/user/billingform.html',
        transclude: true,
        link: function(scope) {
            var defaultForm = {
                name: "",
                address: "",
                city: "",
                state: "",
                zipcode: ""
            }

            scope.reset = function() {
                scope.form = defaultForm
            }

            scope.save = function() {
                billingFactory.saveBilling(scope.form)
                    .then(function() {
                    	scope.update()
                        scope.reset();
                        scope.billingForm.$setPristine()
                    })
            }

        }
    };
});
