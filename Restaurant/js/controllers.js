/**
 * Created by Chris on 2/2/14.
 */

var ppzRestaurantControllers = angular.module("ppzControllers", []);

ppzRestaurantControllers.controller('loginController', ['$scope', 'Login', '$window', '$location',
    function($scope, Login, $window, $location)
    {
        $scope.getUserName = function() {
            return $window.sessionStorage.username;
        };

        $scope.active = function() {
            return $window.sessionStorage.token !== 'null';
        };

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

        $scope.logout = function() {
            Login.logout(function(error){
                $location.path("/login")
            });
        }
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
            $scope.newInfo = angular.copy($scope.restaurant);
        });
        $scope.editing = false;
        $scope.edit = function() {
            $scope.editing = true;
        };
        $scope.cancel = function() {
            $scope.newInfo = angular.copy($scope.restaurant);
            $scope.editing = false;
        }
        $scope.confirm = function() {
            $scope.editing = false;
            RestaurantService.updateRestaurantInfo($scope.restaurantId, $scope.newInfo, function(error, result) {
                if(error)
                    $scope.saved = false;
                else
                    $scope.saved = true;
            });
        }
    }
]);

ppzRestaurantControllers.controller('menuController', ['$scope', 'MenuService',
    function($scope, MenuService)
    {        
        $scope.addingNewItem = false;
        MenuService.getMenu($scope.restaurantId, function(error, menu){
            $scope.error = error;
            $scope.menu = menu;
        });
        $scope.addNewItem = function() {
            if($scope.addingNewItem)
                return;
            $scope.addingNewItem = true;
        };
        $scope.confirmAddItem = function() {
            var newCategory = $scope.newCategoryCategory;
            newCategory.items = [$scope.newCategoryItem];
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

ppzRestaurantControllers.controller('waitingListController', ['$scope', '$routeParams', '$timeout', '$window', 'RestaurantService', 'WaitingListService',
    function($scope, $routeParams, $timeout, $window, RestaurantService, WaitingListService)
    {
        var UPDATE_INTERVAL = 10000;
        var publicWindow = null;
        $scope.restaurantId = $routeParams.restaurantId;
        RestaurantService.getRestaurant($scope.restaurantId, function(error, restaurant){
            $scope.error = error;
            $scope.partyTypeList = restaurant.partyTypeInfos;
        });
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
            if(publicWindow)
            {
                publicWindow.lastCalledNumber = unit.unitId;
            }
            WaitingListService.callUser($scope.restaurantId, unit.unitId, function(error, updatedUnit) {
                // TODO show error
                if(!error) {
                    unit.callCount = updatedUnit.callCount;
                }
            });
        };
        $scope.openPublicWaitListWindow = function(){
            publicWindow = $window.open('#/publicWaitList/' + $scope.restaurantId);
            publicWindow.lastCalledNumber = "abc";
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
        $scope.addUser = function(reserve) {
            var reserveTime = reserve ? $scope.newReserve.time : null;
            var typeId = $scope.newReserve.typeId;
            WaitingListService.addUser($scope.restaurantId, $scope.newReserve.name, $scope.newReserve.typeId, $scope.newReserve.phone, reserveTime, function(error, newUnit) {
                $scope.error = error;
                if(!error) {
                    if(reserve)
                        $scope.reservationList.push(newUnit);
                    else
                        $scope.waitingList[typeId].push(newUnit);
                }
            });
        }
        _updateData();
        _nextUpdate();
    }
]);

ppzRestaurantControllers.controller('publicWaitListController', ['$scope', '$timeout',  '$window',
    function($scope, $timeout, $window) {
        var UPDATE_INTERVAL = 1000;
        var _updateData = function() {
            $scope.currentCallNumber = $window.lastCalledNumber;
        };
        var _nextUpdate = function() {
            $timeout(function() {
                _updateData();
                _nextUpdate();
            }, UPDATE_INTERVAL);
        };

        _updateData();
        _nextUpdate();
    }
]);

ppzRestaurantControllers.controller('reviewListController', ['$scope', '$routeParams', '$timeout', 'ReviewService',
    function($scope, $routeParams, $timeout, ReviewService)
    {
        $scope.loading = true;
        $scope.currentPage = 1;
        $scope.selectPage = function(pageNum) {
            ReviewService.getReviewList($scope.restaurantId, pageNum - 1, function(error, reviewList) {
                $scope.loading = false;
                $scope.error = error;
                $scope.reviewList = reviewList;
            });  
        };
        $scope.selectPage(1);
    }
]);

ppzRestaurantControllers.controller('reviewItemController', ['$scope', 'ReviewService',
    function($scope, ReviewService)
    {
        $scope.replying = false;
        $scope.reply = function() {
            if($scope.replying)
                return;
            $scope.replying = true;
        };
        $scope.confirmReply = function() {
            $scope.review.replyMessage = $scope.message;
            $scope.replying = false;
            ReviewService.replyReview($scope.restaurantId, $scope.review.reviewIndex, $scope.message, function(error, result) {
                if(error)
                    $scope.saved = false;
                else
                    $scope.saved = true;
            });
        };
        $scope.cancelReply = function() {
            $scope.review.replyMessage = null;
            $scope.replying = false;
        };
    }
]);

