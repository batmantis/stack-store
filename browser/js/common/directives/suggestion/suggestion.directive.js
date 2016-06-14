app.directive('suggestion', function (suggestFactory, productFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/suggestion/suggestion.html',
		scope: {
			productId: '='
		},
		link: function (scope) {
			var freq = {},
				freqArray = [],
				products = {};
			suggestFactory.getofProduct(scope.productId)
			.then(function (recs) {
				recs.forEach(function (order) {
					order.products.forEach(function (product) {
						if (scope.productId !== product.id) {
							if (!freq[product.id]) {
								freq[product.id] = 0;
								products[product.id] = product;
							}
							freq[product.id] += 1;
						}
					});
				});
				for (var key in freq) {
					freqArray.push(key);
				}
				freqArray = freqArray.sort(function (a, b) {
					return freq[b] - freq[a];
				});
				scope.suggestArray = freqArray.map(function (id) {
					return products[id];
				});
			});
		}
	}
});