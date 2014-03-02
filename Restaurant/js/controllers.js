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

ppzRestaurantControllers.controller('restaurantDetailController', ['$scope', '$routeParams', 'RestaurantService', 'MenuService',
    function($scope, $routeParams, RestaurantService, MenuService)
    {
        $scope.restaurantId = $routeParams.restaurantId;
        RestaurantService.getRestaurant($scope.restaurantId, function(error, restaurant){
            $scope.error = error;
            $scope.restaurant = restaurant;
        });
        MenuService.getMenu($scope.restaurantId, function(error, menu){
            $scope.error = error;
            $scope.menu = menu;
        });
    }
]);

ppzRestaurantControllers.controller('waitingListController', ['$scope', '$routeParams', '$timeout', 'RestaurantService', 'WaitingListService',
    function($scope, $routeParams, $timeout, RestaurantService, WaitingListService)
    {
        var UPDATE_INTERVAL = 10000;
        $scope.restaurantId = $routeParams.restaurantId;
        $scope.waitingList = [];
        $scope.newReserve = {userId: null, typeId: null};
        var _updateData = function() {
            RestaurantService.getWaitingList($scope.restaurantId, function(error, allList){
                $scope.error = error;
                //TODO only update new ones
                $scope.waitingList = allList.waitingList;
            });
        };
        var _nextUpdate = function() {
            $timeout(function() {
                _updateData();
                _nextUpdate();
            }, UPDATE_INTERVAL);
        };
        $scope.call = function(unit) {
            WaitingListService.callUser($scope.restaurantId, unit.unitId, function(error, updatedUnit) {
                // TODO show error
                if(!error) {
                    unit.callCount = updatedUnit.callCount;
                }
            });
        };
        $scope.remove = function(units, idx) {
            var unit = units[idx];
            WaitingListService.removeUser($scope.restaurantId, unit.unitId, function(error, updatedUnit) {
                // TODO show error
                if(!error) {
                    units.splice(idx, 1);
                }
            });
        };
        $scope.addUser = function() {
            WaitingListService.addUser($scope.restaurantId, $scope.newReserve.userId, $scope.newReserve.typeId, function(error, newUnit) {
                // TODO show error
                if(!error) {
                    $scope.waitingList[newUnit.partyType].push(newUnit);
                }
            });
        }
        _updateData();
        _nextUpdate();
    }
]);

