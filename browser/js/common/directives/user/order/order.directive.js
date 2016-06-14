app.directive('orderHistory', function () {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/user/order/orderhistory.html',
		scope: {
			orders: '='
		},
		link: function (scope) {
			scope.getDate = function (date) {
				return Date(date).slice(0, 15);
			};
			scope.getSubtotal = function (n1, n2) {
				var price = n1 * n2;
				price = price.toString().split('.');
				while (price[1].length < 2) {
					price[1] += '0';
				}
				return price.join('.');
			}
		}
	}
});