/**
 * Created by Chris on 2/2/14.
 */

var ppzRestaurantControllers = angular.module("ppzControllers", []);

ppzRestaurantControllers.controller('loginController', ['$scope', 'Login', '$window', '$location', '$cookies',
    function ($scope, Login, $window, $location, $cookies) {
        $scope.LOGIN_STATUS = {
            INIT: 0,
            LOGINING: 1,
            LOGIN_SUCCESSED: 2,
            LOGIN_FAILED: 3
        };
        $scope.loginStatus = $scope.LOGIN_STATUS.INIT;
        $scope.getUserName = function () {
            return $cookies.username;
        };

        $scope.active = function () {
            return $cookies.token !== 'null';
        };

        $scope.performLogin = function () {
            var loginService = Login;
            $scope.loginStatus = $scope.LOGIN_STATUS.LOGINING;
            loginService.login($scope.username, $scope.password).then(
                function (result) {
                    $scope.loginStatus = $scope.LOGIN_STATUS.LOGIN_SUCCESSED;
                    console.log("login result " + result);
                    console.log("token " + $cookies.token);
                    $location.path("/myRestaurants");
                }, function (result) {
                    $scope.loginStatus = $scope.LOGIN_STATUS.LOGIN_FAILED;
                    console.log("login failed " + result);
                }
            );
        };

        $scope.logout = function () {
            Login.logout(function (error) {
                $location.path("/login")
            });
        }
    }
]);

ppzRestaurantControllers.controller('restaurantListController', ['$scope', 'RestaurantService',
    function ($scope, RestaurantService) {
        $scope.loading = true;
        $scope.includeHeader = true;
        RestaurantService.getMyRestaurantList(function (error, restaurantList) {
            $scope.loading = false;
            $scope.error = error;
            $scope.restaurantList = restaurantList;
        });
    }
]);

ppzRestaurantControllers.controller('restaurantDetailController', ['$scope', '$routeParams', 'RestaurantService', 'MenuService',
    function ($scope, $routeParams, RestaurantService, MenuService) {
        $scope.goBack = function () {
            window.history.back();
        }
        $scope.restaurantId = $routeParams.restaurantId;
        RestaurantService.getRestaurant($scope.restaurantId, function (error, restaurant) {
            $scope.error = error;
            $scope.restaurant = restaurant;
            $scope.newInfo = angular.copy($scope.restaurant);
        });
        $scope.editing = false;
        $scope.edit = function () {
            $scope.editing = true;
        };
        $scope.cancel = function () {
            $scope.newInfo = angular.copy($scope.restaurant);
            $scope.editing = false;
        }
        $scope.confirm = function () {
            $scope.editing = false;
            RestaurantService.updateRestaurantInfo($scope.restaurantId, $scope.newInfo, function (error, result) {
                if (error)
                    $scope.saved = false;
                else
                    $scope.saved = true;
            });
        }
    }
]);

ppzRestaurantControllers.controller('menuController', ['$scope', 'MenuService',
    function ($scope, MenuService) {
        $scope.addingNewItem = false;
        MenuService.getMenu($scope.restaurantId, function (error, menu) {
            $scope.error = error;
            $scope.menu = menu;
        });
        $scope.addNewItem = function () {
            if ($scope.addingNewItem)
                return;
            $scope.addingNewItem = true;
        };
        $scope.confirmAddItem = function () {
            var newCategory = $scope.newCategoryCategory;
            newCategory.items = [$scope.newCategoryItem];
            $scope.menu.menuCategories.push(newCategory);
            $scope.newModel = null;
            $scope.addingNewItem = false;
            $scope.saved = "saving";
            MenuService.updateMenu($scope.menu, function (error, result) {
                if (error)
                    $scope.saved = false;
                else
                    $scope.saved = true;
            });
        };
        $scope.cancelAddItem = function () {
            $scope.newModel = null;
            $scope.newCategoryForm.$setPristine();
            $scope.addingNewItem = false;
        };
    }
]);

ppzRestaurantControllers.controller('menuCategoryController', ['$scope', 'MenuService',
    function ($scope, MenuService) {
        $scope.addingNewItem = false;
        $scope.editing = false;
        $scope.nameModified = $scope.category.categoryName;
        $scope.descriptionModified = $scope.category.categoryDescription;
        $scope.editCategory = function () {
            if ($scope.editing)
                return;
            $scope.editing = true;
        };
        $scope.confirmEditCategory = function () {
            $scope.category.categoryName = $scope.nameModified;
            $scope.category.categoryDescription = $scope.descriptionModified;
            $scope.editing = false;
            $scope.saved = "saving";
            MenuService.updateMenu($scope.menu, function (error, result) {
                if (error)
                    $scope.saved = false;
                else
                    $scope.saved = true;
            });
        };
        $scope.cancelEditCategory = function () {
            $scope.nameModified = $scope.category.categoryName;
            $scope.descriptionModified = $scope.category.categoryDescription;
            $scope.categoryEditForm.$setPristine();
            $scope.editing = false;
        };
        $scope.addNewItem = function () {
            if ($scope.addingNewItem)
                return;
            $scope.addingNewItem = true;
        };
        $scope.confirmAddItem = function () {
            if (!$scope.newForm.$valid)
                return;
            $scope.category.items.push($scope.newItem);
            $scope.newItem = null;
            $scope.addingNewItem = false;
            $scope.saved = "saving";
            MenuService.updateMenu($scope.menu, function (error, result) {
                if (error)
                    $scope.saved = false;
                else
                    $scope.saved = true;
            });
        };
        $scope.cancelAddItem = function () {
            $scope.newItem = null;
            $scope.newForm.$setPristine();
            $scope.addingNewItem = false;
        };
    }
]);

ppzRestaurantControllers.controller('menuItemController', ['$scope', 'MenuService',
    function ($scope, MenuService) {
        $scope.editing = false;
        $scope.newItem = angular.copy($scope.item);
        $scope.editItem = function () {
            if ($scope.editing)
                return;
            $scope.editing = true;
        };
        $scope.confirmEditItem = function () {
            $scope.item.itemName = $scope.newItem.itemName;
            $scope.item.itemDescription = $scope.newItem.itemDescription;
            $scope.item.price = $scope.newItem.price;
            $scope.editing = false;
            $scope.saved = "saving";
            MenuService.updateMenu($scope.menu, function (error, result) {
                if (error)
                    $scope.saved = false;
                else
                    $scope.saved = true;
            });
        };
        $scope.cancelEditItem = function () {
            $scope.newItem = angular.copy($scope.item);
            $scope.editing = false;
        };
        $scope.removeItem = function () {
            $scope.item.deleted = true;
            $scope.item.itemName = "";
            $scope.saved = "saving";
            MenuService.updateMenu($scope.menu, function (error, result) {
                if (error)
                    $scope.saved = false;
                else
                    $scope.saved = true;
            });
        };
    }
]);

ppzRestaurantControllers.controller('waitingListController', ['$scope', '$routeParams', '$timeout', '$window', 'RestaurantService', 'WaitingListService',
    function ($scope, $routeParams, $timeout, $window, RestaurantService, WaitingListService) {
        var UPDATE_INTERVAL = 10000;
        var publicWindow = null;
        $scope.goBack = function () {
            window.history.back();
        }
        $scope.restaurantId = $routeParams.restaurantId;
        RestaurantService.getRestaurant($scope.restaurantId, function (error, restaurant) {
            $scope.error = error;
            $scope.partyTypeList = restaurant.partyTypeInfos;
        });
        $scope.waitingList = [];
        $scope.newReserve = {time: new Date()};
        var _updateData = function () {
            RestaurantService.getWaitingList($scope.restaurantId, function (error, allList) {
                $scope.error = error;
                //TODO only update new ones
                $scope.waitingList = allList.waitingList;
                $scope.reservationList = allList.reservationList;
            });
        };
        var _nextUpdate = function () {
            $timeout(function () {
                _updateData();
                _nextUpdate();
            }, UPDATE_INTERVAL);
        };
        $scope.call = function (unit, unitIdPrefix) {
            if (publicWindow) {
                publicWindow.lastCalledUnit = unit;
                publicWindow.lastCalledUnitPrefix = unitIdPrefix;
            }
            WaitingListService.callUser($scope.restaurantId, unit.unitId, function (error, updatedUnit) {
                // TODO show error
                if (!error) {
                    unit.callCount = updatedUnit.callCount;
                }


            });
        };
        $scope.openPublicWaitListWindow = function () {
            publicWindow = $window.open('#/publicWaitList/' + $scope.restaurantId);
            publicWindow.partyTypes = $scope.partyTypeList;
            publicWindow.lastCalledNumbers = {};
            for (var i = 0; i < publicWindow.partyTypes.length; i++) {
                var party = publicWindow.partyTypes[i];
                publicWindow.lastCalledNumbers[party.unitIdPrefix] = "--";
            }
        };
        $scope.remove = function (units, idx, type) {
            var unit = units[idx];
            WaitingListService.removeUser($scope.restaurantId, unit.unitId, type, function (error, updatedUnit) {
                // TODO show error
                if (!error) {
                    units.splice(idx, 1);
                }
            });
        };
        $scope.addUser = function (reserve) {
            var reserveTime = reserve ? $scope.newReserve.time : null;
            var typeId = $scope.newReserve.typeId;
            WaitingListService.addUser($scope.restaurantId, $scope.newReserve.name, $scope.newReserve.typeId, $scope.newReserve.phone, reserveTime, function (error, newUnit) {
                $scope.error = error;
                if (!error) {
                    if (reserve)
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

ppzRestaurantControllers.controller('publicWaitListController', ['$rootScope', '$scope', '$timeout', '$window',
    function ($rootScope, $scope, $timeout, $window) {
        $scope.partyTypes = $window.partyTypes;
        $rootScope.excludeHeader = true;
        $scope.lastCalledNumbers = $window.lastCalledNumbers;
        $scope.panelTypes = {};
        for (var i = 0; i < $scope.partyTypes.length; i++) {
            var party = $scope.partyTypes[i];
            $scope.panelTypes[party.unitIdPrefix] = "panel-info";
        }
        console.log(JSON.stringify($scope.lastCalledNumbers));
        var UPDATE_INTERVAL = 1000;
        var _updateData = function () {
            var lastCalledUnit = $window.lastCalledUnit;
            var currentPrefix = $scope.currentPrefix;
            var prefix = $window.lastCalledUnitPrefix;
            if (!prefix) {
                return;
            }
            var units = $scope.units;
            var currentCallCount = 0;
            if (!units) {
                $scope.units = {};
                units = $scope.units;
            }
            if (units[prefix]) {
                currentCallCount = units[prefix].callCount;
            }

            //announce call sign
            if (currentCallCount != lastCalledUnit.callCount) {
                var str = "现在叫号, " + lastCalledUnit.unitId;
                var msg = new SpeechSynthesisUtterance(str);
                msg.lang = "zh-CN";
                window.speechSynthesis.speak(msg);
            }

            //display call sign
            if (currentPrefix && currentPrefix != prefix) {
                $scope.panelTypes[currentPrefix] = "panel-info";
            }

            if (currentCallCount != lastCalledUnit.callCount) {
                $scope.lastCalledNumbers[prefix] = lastCalledUnit.unitId;
                $scope.panelTypes[prefix] = "panel-primary animate-flicker";

            }

            $scope.currentPrefix = prefix;
            units[prefix] = lastCalledUnit;

        };
        var _nextUpdate = function () {
            $timeout(function () {
                _updateData();
                _nextUpdate();
            }, UPDATE_INTERVAL);
        };

        _updateData();
        _nextUpdate();
    }
]);

ppzRestaurantControllers.controller('reviewListController', ['$scope', '$routeParams', '$timeout', 'ReviewService',
    function ($scope, $routeParams, $timeout, ReviewService) {
        $scope.loading = true;
        $scope.currentPage = 1;
        $scope.selectPage = function (pageNum) {
            ReviewService.getReviewList($scope.restaurantId, pageNum - 1, function (error, reviewList) {
                $scope.loading = false;
                $scope.error = error;
                $scope.reviewList = reviewList;
            });
        };
        $scope.selectPage(1);
    }
]);

ppzRestaurantControllers.controller('reviewItemController', ['$scope', 'ReviewService',
    function ($scope, ReviewService) {
        $scope.replying = false;
        $scope.reply = function () {
            if ($scope.replying)
                return;
            $scope.replying = true;
        };
        $scope.confirmReply = function () {
            $scope.review.replyMessage = $scope.message;
            $scope.replying = false;
            ReviewService.replyReview($scope.restaurantId, $scope.review.reviewIndex, $scope.message, function (error, result) {
                if (error)
                    $scope.saved = false;
                else
                    $scope.saved = true;
            });
        };
        $scope.cancelReply = function () {
            $scope.review.replyMessage = null;
            $scope.replying = false;
        };
    }
]);

