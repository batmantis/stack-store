app.directive('sidebar', function(sidebarFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/sidebar/sidebar.html',
        link: function(scope) {
            sidebarFactory.getAll()
                .then(function(data) {
                    scope.allTags = data
                })
        },

    };
});
