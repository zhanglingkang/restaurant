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
                    $location.path("/myRestaurants");
                }, function(result)
                {
                    console.log("login failed " + result);
                }

            );
        };
    }
]);

ppzRestaurantControllers.controller('restaurantListController', ['$scope', 'RestaurantService',
    function($scope, RestaurantService)
    {
        $scope.loading = true;
        RestaurantService.getMyRestaurantList(function(error, restaurantList){
            $scope.loading = false;
            $scope.error = error;
            $scope.restaurantList = restaurantList;
        });
    }
]);

ppzRestaurantControllers.controller('waitingListController', ['$scope', '$routeParams', 'RestaurantService',
    function($scope, $routeParams, RestaurantService)
    {
        $scope.restaurantId = $routeParams.restaurantId;
        $scope.loading = true;
        RestaurantService.getWaitingList($scope.restaurantId, function(error, allList){
            $scope.loading = false;
            $scope.error = error;
            $scope.waitingList = allList.waitingList;
        });
    }
]);

