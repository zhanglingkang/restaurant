"use strict"

define(function (require) {
    var app = require("app")
    require("./menu-service")
    app.controller('menuCategoryController', ['$scope', 'menuService',
        function ($scope, menuService) {
            var items = [];
            $scope.addingNewItem = false;
            $scope.editing = false;
            $scope.nameModified = $scope.category.categoryName;
            $scope.descriptionModified = $scope.category.categoryDescription;
            $scope.editCategory = function () {
                $scope.editing = true;
                $scope.editStatus = $scope.REQUEST_STATUS.INIT;
            };

            $scope.confirmEditCategory = function () {
                $scope.editStatus = $scope.REQUEST_STATUS.ING;
                menuService.modifyMenuCategory({
                    categoryName: $scope.nameModified,
                    categoryDescription: $scope.descriptionModified,
                    categoryId: $scope.category.categoryId
                }, $scope.menu.restaurantId).then(function () {
                    $scope.editStatus = $scope.REQUEST_STATUS.SUCCESSFUL;
                    $scope.category.categoryName = $scope.nameModified;
                    $scope.category.categoryDescription = $scope.descriptionModified;
                    $scope.editing = false;
                }, function () {
                    $scope.editStatus = $scope.REQUEST_STATUS.FAILED;
                });
            };

            $scope.sortMenuItem = function (data) {
                var previousItemId = null;
                var sortList = data.sortList;
                $scope.setAlert({
                    showCover: true,
                    alertContent: "排序中..."
                });
                sortList.forEach(function (item, index) {
                    if (item.id === data.dragNodeId) {
                        if (index > 0) {
                            previousItemId = data.sortList[index - 1].id;
                        }
                    }
                });
                menuService.sortMenuItem({
                    itemId: data.dragNodeId,
                    previousItemId: previousItemId,
                    categoryId: $scope.category.categoryId
                }, $scope.menu.restaurantId).then(function () {
                    var menuItemList = [];
                    sortList.forEach(function (item, index) {
                        menuItemList.push($scope.getMenuItem(item.id));
                    });
                    $scope.category.items = menuItemList;
                    $scope.setAlert({
                        showCover: false
                    });
                });
            };
            /**
             * @method 从$scope.category.items中获取menuItem
             * @param {String} menuItemId
             */
            $scope.getMenuItem = function (menuItemId) {
                var menuItem;
                $scope.category.items.some(function (item) {
                    if (item.itemId === menuItemId) {
                        menuItem = item;
                        return true;
                    }
                });
                return menuItem;
            };
            $scope.deleteStatus = $scope.REQUEST_STATUS.INIT;
            $scope.removeMenuCategory = function () {
                $scope.deleteStatus = $scope.REQUEST_STATUS.ING;
                menuService.removeMenuCategory(
                    $scope.category.categoryId,
                    $scope.menu.restaurantId).then(function () {
                        $scope.editStatus = $scope.REQUEST_STATUS.SUCCESSFUL;
                        $scope.menu.menuCategories = $scope.menu.menuCategories.filter(function (category) {
                            return category.categoryId !== $scope.category.categoryId;
                        });
                    }, function () {
                        $scope.editStatus = $scope.REQUEST_STATUS.FAILED;
                    });
            };
            $scope.$on("collapse", function ($event, collapse) {
//            if (collapse) {
//                items = $scope.category.items;
//                $scope.category.items = [];
//            } else {
//                $scope.category.items = items;
//            }
                $scope.collapse = collapse;
            });
            $scope.cancelEditCategory = function () {
                $scope.nameModified = $scope.category.categoryName;
                $scope.descriptionModified = $scope.category.categoryDescription;
                $scope.categoryEditForm.$setPristine();
                $scope.editing = false;
            };
            $scope.addNewItem = function () {
                if ($scope.addingNewItem) {
                    return;
                }
                $scope.addingNewItem = true;
                $scope.addMenuItemStatus = $scope.REQUEST_STATUS.INIT;
                $scope.menuItemForm = {};
                $scope.menuItemFormValidation.$setPristine();
            };
            $scope.confirmAddItem = function (valid) {
                if (valid) {
                    $scope.addMenuItemStatus = $scope.REQUEST_STATUS.ING;
                    menuService.addMenuItem(angular.extend($scope.menuItemForm, {
                        categoryId: $scope.category.categoryId
                    }), $scope.menu.restaurantId).then(function (data) {
                        $scope.addMenuItemStatus = $scope.REQUEST_STATUS.SUCCESSFUL;
                        $scope.category.items = $scope.category.items.concat(data.results);
                        $scope.addingNewItem = false;
                    }, function () {
                        $scope.addMenuItemStatus = $scope.REQUEST_STATUS.FAILED;
                    });
                }
            };
            $scope.cancelAddItem = function () {
                $scope.addingNewItem = false;
            };

            $scope.toggleMenuCategory = function (categoryId) {
                $("#" + categoryId).collapse("toggle");
            }

        }
    ]);

})