/**
 * Created by Chris on 2/2/14.
 */

var ppzRestaurant = angular.module("ppzRestaurant", ["ngRoute", "ppzControllers", 'ppzServices', 'ui.bootstrap']);

ppzRestaurant.config(["$routeProvider", function($routeProvider)
{
    $routeProvider.
        when('/login',{
            templateUrl : "partials/login.html",
            controller : "loginController"
        }).
        when("/myRestaurants", {
            templateUrl : "partials/restaurantList.html",
            controller: "restaurantListController"
        }).
        when("/restaurant/:restaurantId", {
            templateUrl: "partials/restaurantDetails.html",
            controller: "restaurantDetailController"
        }).
        when('/waitinglist/:restaurantId', {
            templateUrl: 'partials/waitinglist.html',
            controller: 'waitingListController'
        }).
        otherwise({
            redirectTo : "/login"
        });
}]);