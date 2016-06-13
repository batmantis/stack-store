'use strict';

app.controller('ReviewCtrl', function($scope, reviewFactory){
	reviewFactory.getAll()
	.then(reviews => $scope.reviews = reviews)

})
