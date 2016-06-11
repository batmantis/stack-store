'use strict';

app.controller('ProductsCtrl', function($scope, productFactory, tagFactory) {
    productFactory.getAll()
        .then(products => $scope.products = products)

    tagFactory.getAll()
        .then(tags => $scope.tags = tags)

    $scope.removeTag = tagFactory.removeTag

    $scope.addTag = tagFactory.addTag

    $scope.$watch('tag', function() {
        if (!$scope.selectedProduct) return
        $scope.selectedProduct.tags.forEach(function(tag) {
            if (tag.category === $scope.tag.category) {
                console.log('its true')
                $scope.tagChecker = true
                $scope.$digest()
                return
            }
        })
        $scope.tagChecker = false
        $scope.$digest()
    })

})
