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

        $scope.addingNewItem = false;
        $scope.addNewItem = function() {
            if($scope.addingNewItem)
                return;
            $scope.addingNewItem = true;
        };
        $scope.confirmAddItem = function() {
            var newCategory = $scope.newModel.category;
            newCategory.items = [$scope.newModel.item];
            $scope.menu.menuCategories.push(newCategory);
            $scope.newModel = null;
            $scope.addingNewItem = false;
            $scope.saved = "saving";
            MenuService.updateMenu($scope.menu, function(error, result) {
                if(error)
                    $scope.saved = false;
                else
                    $scope.saved = true;
            });
        };
        $scope.cancelAddItem = function() {
            $scope.newModel = null;
            $scope.newCategoryForm.$setPristine();
            $scope.addingNewItem = false;
        };
    }
]);

ppzRestaurantControllers.controller('menuCategoryController', ['$scope', 'MenuService',
    function($scope, MenuService)
    {
        $scope.addingNewItem = false;
        $scope.editing = false;
        $scope.nameModified = $scope.category.categoryName;
        $scope.descriptionModified =$scope.category.categoryDescription;
        $scope.editCategory= function() {
            if($scope.editing)
                return;
            $scope.editing = true;
        };
        $scope.confirmEditCategory = function() {
            $scope.category.categoryName = $scope.nameModified;
            $scope.category.categoryDescription = $scope.descriptionModified;
            $scope.editing = false;
            $scope.saved = "saving";
            MenuService.updateMenu($scope.menu, function(error, result) {
                if(error)
                    $scope.saved = false;
                else
                    $scope.saved = true;
            });
        };
        $scope.cancelEditCategory = function() {
            $scope.nameModified = $scope.category.categoryName;
            $scope.descriptionModified =$scope.category.categoryDescription;
            $scope.categoryEditForm.$setPristine();
            $scope.editing = false;
        };
        $scope.addNewItem = function() {
            if($scope.addingNewItem)
                return;
            $scope.addingNewItem = true;
        };
        $scope.confirmAddItem = function() {
            if(!$scope.newForm.$valid)
                return;
            $scope.category.items.push($scope.newItem);
            $scope.newItem = null;
            $scope.addingNewItem = false;
            $scope.saved = "saving";
            MenuService.updateMenu($scope.menu, function(error, result) {
                if(error)
                    $scope.saved = false;
                else
                    $scope.saved = true;
            });
        };
        $scope.cancelAddItem = function() {
            $scope.newItem = null;
            $scope.newForm.$setPristine();
            $scope.addingNewItem = false;
        };
    }
]);

ppzRestaurantControllers.controller('menuItemController', ['$scope', 'MenuService',
    function($scope, MenuService)
    {
        $scope.editing = false;
        $scope.newItem = angular.copy($scope.item);
        $scope.editItem = function() {
            if($scope.editing)
                return;
            $scope.editing = true;
        };
        $scope.confirmEditItem = function() {
            $scope.item.itemName = $scope.newItem.itemName;
            $scope.item.itemDescription = $scope.newItem.itemDescription;
            $scope.item.price = $scope.newItem.price;
            $scope.editing = false;
            $scope.saved = "saving";
            MenuService.updateMenu($scope.menu, function(error, result) {
                if(error)
                    $scope.saved = false;
                else
                    $scope.saved = true;
            });
        };
        $scope.cancelEditItem = function() {
            $scope.newItem = angular.copy($scope.item);
            $scope.editing = false;
        };
        $scope.removeItem = function() {
            $scope.item.deleted = true;
            $scope.item.itemName = "";
            $scope.saved = "saving";
            MenuService.updateMenu($scope.menu, function(error, result) {
                if(error)
                    $scope.saved = false;
                else
                    $scope.saved = true;
            });
        };
    }
]);

ppzRestaurantControllers.controller('waitingListController', ['$scope', '$routeParams', '$timeout', 'RestaurantService', 'WaitingListService',
    function($scope, $routeParams, $timeout, RestaurantService, WaitingListService)
    {
        var UPDATE_INTERVAL = 10000;
        $scope.restaurantId = $routeParams.restaurantId;
        $scope.waitingList = [];
        $scope.newReserve = {time: new Date()};
        var _updateData = function() {
            RestaurantService.getWaitingList($scope.restaurantId, function(error, allList){
                $scope.error = error;
                //TODO only update new ones
                $scope.waitingList = allList.waitingList;
                $scope.reservationList = allList.reservationList;
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
        $scope.remove = function(units, idx, type) {
            var unit = units[idx];
            WaitingListService.removeUser($scope.restaurantId, unit.unitId, type, function(error, updatedUnit) {
                // TODO show error
                if(!error) {
                    units.splice(idx, 1);
                }
            });
        };
        $scope.addUser = function() {
            WaitingListService.addUser($scope.restaurantId, $scope.newReserve.name, $scope.newReserve.typeId, $scope.newReserve.phone, $scope.newReserve.time, function(error, newUnit) {
                $scope.error = error;
                if(!error) {
                    $scope.reservationList.push(newUnit);
                }
            });
        }
        _updateData();
        _nextUpdate();
    }
]);

ppzRestaurantControllers.controller('reviewListController', ['$scope', '$routeParams', '$timeout', 'ReviewService',
    function($scope, $routeParams, $timeout, ReviewService)
    {
        $scope.loading = true;
        ReviewService.getReviewList($scope.restaurantId, function(error, reviewList){
            $scope.loading = false;
            $scope.error = error;
            $scope.reviewList = reviewList;
        });   
    }
]);

