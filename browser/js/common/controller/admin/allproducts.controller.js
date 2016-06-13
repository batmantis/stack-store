'use strict';

app.controller('ProductsCtrl', function($scope, productFactory, tagFactory) {
    productFactory.getAll()
        .then(products => $scope.products = products)

    tagFactory.getAll()
        .then(tags => $scope.tags = tags)

    $scope.removeTag = tagFactory.removeTag

    $scope.addTag = tagFactory.addTag

    $scope.removePic = productFactory.removePic

    $scope.addPic = productFactory.addPic

    $scope.removeCat = function() {
        tagFactory.removeCat($scope.managedTag.id)
            .then(function() {
                return tagFactory.getAll()
            })
            .then(tags => $scope.tags = tags)
            .catch(function(error) {
                console.error(error.stack)
            })
    }

    $scope.addCat = function() {
        tagFactory.addCat($scope.managedTag)
            .then(function() {
                return tagFactory.getAll()
            })
            .then(tags => $scope.tags = tags)
            .catch(function(error) {
                console.error(error.stack)
            })
    }
    $scope.$watch('tag', function() {
        if (!$scope.selectedProduct) return
        $scope.selectedProduct.tags.forEach(function(tag) {
            if (tag.category === $scope.tag.category) {
                $scope.tagChecker = true
                $scope.$digest()
                return
            }
        })
        $scope.tagChecker = false
        $scope.$digest()
    })

})
