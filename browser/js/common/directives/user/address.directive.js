app.directive('addAddress', function(addressFactory) {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
        	update: '&'
        },
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: 'userDetailController',
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'js/common/directives/user/addressform.html',
        // templateUrl: '',
        // replace: true,
        transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
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
                addressFactory.saveAddress(scope.form)
                    .then(function() {
                    	scope.update()
                        scope.reset();
                        scope.addressForm.$setPristine()
                        // scope.$apply();

                    // }).then(function(){
                    })
            }

        }
    };
});
