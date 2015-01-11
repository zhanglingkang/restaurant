"use strict"

define(function (require) {
    var app = require("app")
    require("./menu-service")
    app.controller('menuItemController', ['$scope', 'menuService',
        function ($scope, menuService) {
            $scope.editing = false;
            $scope.newItem = angular.copy($scope.item);
            $scope.editItem = function () {
                if ($scope.editing)
                    return;
                $scope.editing = true;
            };
            $scope.confirmEditItem = function () {
                $scope.editMenuItemStatus = $scope.REQUEST_STATUS.REQUESTING;
                menuService.modifyMenuItem({
                        itemId: $scope.newItem.itemId,
                        itemName: $scope.newItem.itemName,
                        itemDescription: $scope.newItem.itemDescription,
                        price: $scope.newItem.price,
                        categoryId: $scope.category.categoryId
                    }, $scope.menu.restaurantId
                ).then(
                    function () {
                        $scope.editMenuItemStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                        $scope.item.itemName = $scope.newItem.itemName;
                        $scope.item.itemDescription = $scope.newItem.itemDescription;
                        $scope.item.price = $scope.newItem.price;
                        $scope.editing = false;
                    }, function () {
                        $scope.editMenuItemStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                    });
            };
            $scope.cancelEditItem = function () {
                $scope.newItem = angular.copy($scope.item);
                $scope.editing = false;
            };
            $scope.removeItem = function () {
                menuService.removeMenuItem({
                    itemId: $scope.item.itemId,
                    categoryId: $scope.category.categoryId
                }, $scope.menu.restaurantId).then(function () {
                    $scope.category.items = $scope.category.items.filter(function (menuItem) {
                        return menuItem.itemId !== $scope.item.itemId;
                    });
                });
            };
        }
    ])

})