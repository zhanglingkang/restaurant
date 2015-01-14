"use strict"
define(function (require) {
    var app = require("app")
    var pubSub = require("public/general/pub-sub")
    app.controller('restaurantListController', [
        '$scope', 'restaurantService', "menuService",
        function ($scope, restaurantService, menuService) {
            $scope.loading = true
            $scope.includeHeader = true
            restaurantService.getMyRestaurantList().then(function (data) {
                $scope.loading = false
                $scope.restaurantList = data.results
                console.log("loading restaurantList")
                pubSub.publish("loadedRestaurantList", $scope.restaurantList)
                //这里加载菜单时预加载菜单，缓解管理页面的性能问题。
                $scope.restaurantList.forEach(function (restaurant) {
                    menuService.getMenu(restaurant.restaurantId)
                })
            }, function (error) {
                $scope.error = error
            })
        }
    ])
})