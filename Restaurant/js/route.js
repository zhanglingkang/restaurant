"use strict"

define(function (require, exports, module) {
    var app = require("app")
    require("public/general/prototype")
    require("public/local/reservation-controller")
    require("public/local/confirmation-modal-controller")
    require("public/local/http")
    require("index/controller")
    require("login/controller")
    require("manage-account/controller")
    require("print-number/controller")
    require("public-wait-list/controller")
    require("restaurant-detail/controller")
    require("restaurant-list/controller")
    require("waiting-list/controller")
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'loginController'
            }).
            when('/myRestaurants', {
                templateUrl: 'partials/restaurantList.html',
                controller: 'restaurantListController'
            }).
            when('/restaurant/:restaurantId', {
                templateUrl: 'partials/restaurantDetails.html',
                controller: 'restaurantDetailController'
            }).
            when('/waitinglist/:restaurantId', {
                templateUrl: 'partials/waitinglist.html',
                controller: 'waitingListController'
            }).
            when('/publicWaitList/:restaurantId', {
                templateUrl: 'partials/publicWaitList.html',
                controller: 'publicWaitListController'
            }).
            when('/printNumber/:unitId', {
                templateUrl: 'partials/printNumber.html',
                controller: 'printNumberController'
            }).
            when('/manageAccount', {
                templateUrl: 'partials/manageAccount.html',
                controller: 'manageAccountController'
            }).
            otherwise({
                redirectTo: '/myRestaurants'
            })
    }])
})