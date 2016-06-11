app.directive('search', function ($state, searchFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/search/search.html',
		link: function (scope) {
			scope.search = function(query) {
				$state.go('search', {name: query})
			}
		}
	}
})
