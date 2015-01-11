"use strict"

define(function (require) {
    var app = require("app")
    var reservationCtrl = ["$scope", "reservationService" , "dataService", "$location", "$mdBottomSheet", "restaurantService" , "queueMap", function ($scope, reservationService, dataService, $location, $mdBottomSheet, restaurantService, queueMap) {
        $scope.reservationMap = []
        $scope.restaurantList = []

        angular.forEach(queueMap, function (queue, restaurantId) {
            restaurantService.getRestaurant(restaurantId).then(function (restaurant) {
                $scope.restaurantList.push(restaurant)
            })
            $scope.reservationMap[restaurantId] = queue.reservationList.filter(function (item) {
                return item.reservationStatus === dataService.reservationStatus.waitConfirm
            })
        })
        $scope.viewReservationDetail = function (restaurant) {
            $location.path("/waitinglist/" + restaurant.restaurantId)
            $mdBottomSheet.hide()
        }

    }]
    app.controller("reservationCtrl", reservationCtrl)
})