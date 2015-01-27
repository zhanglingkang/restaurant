"use strict"

define(function (require) {
    var app = require("app")
    require("./menu-service")
    app.controller('menuCategoryController', ['$scope', 'menuService',
        function ($scope, menuService) {
            menuService.modifyMenuCategory = menuService.modifyMenuCategory.setRequestStatus($scope, "editStatus")
            menuService.removeMenuCategory = menuService.removeMenuCategory.setRequestStatus($scope, "deleteStatus")
            menuService.addMenuItem = menuService.addMenuItem.setRequestStatus($scope, "addMenuItemStatus")
            var items = []
            $scope.addingNewItem = false
            $scope.editing = false
            $scope.nameModified = $scope.category.categoryName
            $scope.descriptionModified = $scope.category.categoryDescription
            $scope.editCategory = function () {
                $scope.editing = true
                $scope.editStatus = $scope.REQUEST_STATUS.INIT
            }

            $scope.confirmEditCategory = function () {
                menuService.modifyMenuCategory({
                    categoryName: $scope.nameModified,
                    categoryDescription: $scope.descriptionModified,
                    categoryId: $scope.category.categoryId
                }, $scope.menu.restaurantId).then(function () {
                    $scope.category.categoryName = $scope.nameModified
                    $scope.category.categoryDescription = $scope.descriptionModified
                    $scope.editing = false
                })
            }

            $scope.sortMenuItem = function (data) {
                var previousItemId = null
                var sortList = data.sortList
                $scope.setAlert({
                    showCover: true,
                    alertContent: "排序中..."
                })
                sortList.forEach(function (item, index) {
                    if (item.id === data.dragNodeId) {
                        if (index > 0) {
                            previousItemId = data.sortList[index - 1].id
                        }
                    }
                })
                menuService.sortMenuItem({
                    itemId: data.dragNodeId,
                    previousItemId: previousItemId,
                    categoryId: $scope.category.categoryId
                }, $scope.menu.restaurantId).then(function () {
                    var menuItemList = []
                    sortList.forEach(function (item, index) {
                        menuItemList.push($scope.getMenuItem(item.id))
                    })
                    $scope.category.items = menuItemList
                    $scope.setAlert({
                        showCover: false
                    })
                })
            }
            /**
             * @method 从$scope.category.items中获取menuItem
             * @param {String} menuItemId
             */
            $scope.getMenuItem = function (menuItemId) {
                var menuItem
                $scope.category.items.some(function (item) {
                    if (item.itemId === menuItemId) {
                        menuItem = item
                        return true
                    }
                })
                return menuItem
            }
            $scope.deleteStatus = $scope.REQUEST_STATUS.INIT
            $scope.removeMenuCategory = function () {
                menuService.removeMenuCategory(
                    $scope.category.categoryId,
                    $scope.menu.restaurantId).then(function () {
                        $scope.menu.menuCategories = $scope.menu.menuCategories.filter(function (category) {
                            return category.categoryId !== $scope.category.categoryId
                        })
                    })
            }
            $scope.$on("collapse", function ($event, collapse) {
//            if (collapse) {
//                items = $scope.category.items
//                $scope.category.items = []
//            } else {
//                $scope.category.items = items
//            }
                $scope.collapse = collapse
            })
            $scope.cancelEditCategory = function () {
                $scope.nameModified = $scope.category.categoryName
                $scope.descriptionModified = $scope.category.categoryDescription
                $scope.categoryEditForm.$setPristine()
                $scope.editing = false
            }
            $scope.addNewItem = function () {
                if ($scope.addingNewItem) {
                    return
                }
                $scope.addingNewItem = true
                $scope.addMenuItemStatus = $scope.REQUEST_STATUS.INIT
                $scope.menuItemForm = {}
                $scope.menuItemFormValidation.$setPristine()
            }
            $scope.confirmAddItem = function (valid) {
                if (valid) {
                    menuService.addMenuItem(angular.extend($scope.menuItemForm, {
                        categoryId: $scope.category.categoryId
                    }), $scope.menu.restaurantId).then(function (data) {
                        $scope.category.items = $scope.category.items.concat(data.results)
                        $scope.addingNewItem = false
                    })
                }
            }
            $scope.cancelAddItem = function () {
                $scope.addingNewItem = false
            }

            $scope.toggleMenuCategory = function (categoryId) {
                $("#" + categoryId).collapse("toggle")
            }

        }
    ])

})