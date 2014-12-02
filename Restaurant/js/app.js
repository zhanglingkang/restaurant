/**
 * Created by Chris on 2/2/14.
 */
;
(function () {
    var ppzRestaurant = angular.module('ppzRestaurant', ['ngRoute', 'ngCookies', 'ppzUtils', 'ppzControllers', 'ppzDirectives', 'ppzServices', 'ui.bootstrap', 'angularFileUpload']);

    ppzRestaurant.config(['$routeProvider', '$httpProvider', '$interpolateProvider',
        function ($routeProvider, $httpProvider, $interpolateProvider) {
            $httpProvider.interceptors.push(['$q', '$location', '$cookies', function ($q, $location, $cookies) {
                return {
                    'response': function (response) {
                        if ($location.path() !== '/login' && $cookies.token == 'null') {
                            $location.path('/login');
                        }
                        return response;
                    }
                };
            }]);

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
                });
        }
    ]);
}());