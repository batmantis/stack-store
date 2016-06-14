app.directive('addBilling', function(billingFactory) {
    // Runs during compile
    return {
        scope: {
        	update: '&',
            token: '&',
            number: "&"
        },
        restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'js/common/directives/user/billingform.html',
        transclude: true,
        link: function(scope) {
            var defaultForm = {
                creditCard: "",
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
                scope.form.number = scope.token()
                scope.form.creditCard = scope.number()
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
