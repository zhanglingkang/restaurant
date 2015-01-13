"use strict"

define(function (require) {
    var app = require("app")
    require("./menu-controller")
    require("./review-list-controller")
    require("./review-item-controller")
    require("./file-uploader-controller")
    require("./menu-service")
    require("public/local/restaurant-service")
    require("public/general/directive/confirm-hint")
    require("public/general/directive/prevent-spread")
    app.controller('restaurantDetailController', ['$scope', '$routeParams', 'restaurantService', 'menuService',
        function ($scope, $routeParams, restaurantService, menuService) {
            $scope.goBack = function () {
                window.history.back();
            }
            $scope.restaurantId = $routeParams.restaurantId;
            restaurantService.getRestaurant($scope.restaurantId).then(function (restaurant) {
                $scope.restaurant = restaurant;
                $scope.newInfo = angular.copy($scope.restaurant);
            }, function (error) {
                $scope.error = error;
            });
            $scope.editing = false;
            $scope.edit = function () {
                $scope.editing = true;
            };
            $scope.cancel = function () {
                $scope.newInfo = angular.copy($scope.restaurant);
                $scope.editing = false;
            };
            $scope.confirm = function () {
                $scope.editing = false;
                restaurantService.updateRestaurantInfo($scope.restaurantId, $scope.newInfo).then(function () {
                    $scope.saved = true;
                }, function () {
                    $scope.saved = false;
                })
            }
        }
    ]);
})