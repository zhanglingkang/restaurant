/**
 * Created by Chris on 2/2/14.
 */

var ppzRestaurantControllers = angular.module("ppzControllers", []);

ppzRestaurantControllers.controller('loginController', ['$scope', 'Login', '$window', '$location',
    function($scope, Login, $window, $location)
    {
        $scope.username = "admin";
        $scope.password = "admin";

        $scope.performLogin = function()
        {
            var loginService = Login;
            loginService.login($scope.username, $scope.password).then(
                function(result)
                {
                   console.log("login result " + result);
                    console.log("token " + $window.sessionStorage.token);
                    $location.redirectTo("/myRestaurants");
                }, function(result)
                {
                    console.log("login failed " + result);
                }

            );
        };
    }]);

ppzRestaurantControllers.controller('restaurantListController', ['$scope',
    function($scope)
    {
        $scope.username = "none";
        $scope.password = "nah";
    }]);

ppzRestaurantControllers.controller('restaurantDetailController', ['$scope',
    function($scope)
    {
        $scope.username = "none";
        $scope.password = "nah";
    }]);

