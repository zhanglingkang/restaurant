/**
 * Created by Chris on 2/2/14.
 */

var ppzRestaurantControllers = angular.module("ppzControllers", []);
ppzRestaurantControllers.controller('appController', ["$rootScope", "$scope", '$cookies', "$location", function ($rootScope, $scope, $cookies, $location) {
    /**
     * 任何一个请求都有四种状态：INIT 尚未请求 REQUESTING 请求中 REQUEST_SUCCESSED 请求成功 REQUEST_FAILED 请求失败
     */
    $rootScope.REQUEST_STATUS = {
        INIT: 0,
        REQUESTING: 1,
        REQUEST_SUCCESSED: 2,
        REQUEST_FAILED: 3
    };
    $rootScope.KEY_CODE = {
        ENTER: 13,
        BACKSPACE: 8,
        TOP: 38,
        RIGHT: 39,
        BOTTOM: 40,
        LEFT: 37
    };
    /**
     * 判断当前用户是否已登录
     */
    function isLogined() {
        return !!($cookies.token && $cookies.token !== "null");
    }

    $scope.$on("$locationChangeStart", function (event, newUrl, oldUrl) {
        if (!isLogined() && !/login/.test(newUrl)) {
            $location.path("/login");
        }
    });
}]);
ppzRestaurantControllers.controller('loginController', ['$scope', 'Login', '$window', '$location', '$cookies',
    function ($scope, Login, $window, $location, $cookies) {
        $scope.getUserName = function () {
            return $cookies.username;
        };
        $scope.resetPasswordForm = {
            userName: ""
        };
        $scope.submitted = false;
        $scope.active = function () {
            return $cookies.token !== 'null';
        };
        $scope.initResetInfo = function () {
            $scope.resetPasswordForm.userName = "";
            $scope.resetStatus = $scope.REQUEST_STATUS.INIT;
            $scope.submitted = false;
        };
        $scope.resetStatus = $scope.REQUEST_STATUS.INIT;
        $scope.resetPassword = function (valid) {
            $scope.submitted = true;
            if (valid) {
                $scope.resetStatus = $scope.REQUEST_STATUS.REQUESTING;
                Login.resetPassword($scope.resetPasswordForm.userName, function (data) {
                    $scope.resetStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                }, function (msg) {
                    $scope.resetStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                    $scope.resetHint = msg;
                });
            }
        };
        $scope.loginStatus = $scope.REQUEST_STATUS.INIT;
        $scope.performLogin = function () {
            var loginService = Login;
            $scope.loginHintShow = true;
            $scope.loginStatus = $scope.REQUEST_STATUS.REQUESTING;
            loginService.login($scope.username, $scope.password).then(
                function (result) {
                    $scope.loginStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                    console.log("login result " + result);
                    console.log("token " + $cookies.token);
                    $location.path("/myRestaurants");
                }, function (result) {
                    $scope.loginStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
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
        $scope.refreshMenu = function () {
            MenuService.getMenu($scope.restaurantId, function (error, menu) {
                $scope.error = error;
                $scope.menu = menu;
            });
        };
        /**
         *
         * @param {Boolean} collapse
         */
        $scope.collapseAll = function (collapse) {
            $scope.$broadcast("collapse", collapse);
        };
        $scope.refreshMenu();
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
            MenuService.updateMenu({
                restaurantId: $scope.menu.restaurantId,
                menuCategories: [newCategory]
            }, function (error, result) {
                if (error) {
                    $scope.saved = false;
                }
                else {
                    $scope.saved = true;
                }
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
        $(".collapse").collapse();
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
                if (error) {
                    $scope.saved = false;
                }
                else {
                    $scope.saved = true;
                }
            });
        };
        $scope.$on("collapse", function ($event, collapse) {
            $scope.collapse = collapse;
        });
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
            var newAddCategory = angular.copy($scope.category);
            newAddCategory.items = [];
            newAddCategory.items.push($scope.newItem);
            $scope.category.items.push($scope.newItem);
            $scope.newItem = null;
            $scope.addingNewItem = false;
            $scope.saved = "saving";
            MenuService.updateMenu({
                restaurantId: $scope.menu.restaurantId,
                menuCategories: [newAddCategory]
            }, function (error, result) {
                if (error) {
                    $scope.saved = false;
                }
                else {
                    $scope.saved = true;
                }
            });
        };
        $scope.cancelAddItem = function () {
            $scope.newItem = null;
            $scope.newForm.$setPristine();
            $scope.addingNewItem = false;
        };

        $scope.toggleMenuCategory = function (categoryId) {
            $("#" + categoryId).collapse("toggle");
        }

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
            MenuService.updateMenu({
                restaurantId: $scope.menu.restaurantId,
                menuCategories: [$scope.category]
            }, function (error, result) {
                if (error) {
                    $scope.saved = false;
                }
                else {
                    $scope.saved = true;
                }
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
                if (error) {
                    $scope.saved = false;
                }
                else {
                    $scope.saved = true;
                }
            });
        };
    }
]);

ppzRestaurantControllers.controller('waitingListController', ['$modal', '$scope', '$routeParams', '$timeout', '$window', 'RestaurantService', 'WaitingListService',
    function ($modal, $scope, $routeParams, $timeout, $window, RestaurantService, WaitingListService) {
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
                $scope.completeList = allList.completeList;
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
                var frontUnit = "--";
                if ($scope.waitingList[i + 1].length > 0) {
                    frontUnit = $scope.waitingList[i + 1][0].unitId;
                }
                publicWindow.lastCalledNumbers[party.unitIdPrefix] = frontUnit;
            }
        };
        $scope.remove = function (units, idx, type) {
            var unit = units[idx];
            var unitIdPrefix = unit.unitId.charAt(0);
            var nextUnit = null;
            if (units[idx + 1]) {
                nextUnit = units[idx + 1];
            }
            WaitingListService.removeUser($scope.restaurantId, unit.unitId, type, function (error, updatedUnit) {
                if (error != null) {
                    alert(error);
                    units.splice(idx, 1);
                } else if (publicWindow && idx == 0) {
                    //update public window if unit is removed from the front
                    publicWindow.lastReplacedUnit = nextUnit;
                    publicWindow.lastReplacedUnitPrefix = unitIdPrefix;
                }
            });
        };
        $scope.addUser = function (reserve) {
            var reserveTime = reserve ? $scope.newReserve.time : null;
            var typeId = $scope.newReserve.typeId;
            WaitingListService.addUser($scope.restaurantId, $scope.newReserve.name, $scope.newReserve.typeId, $scope.newReserve.phone, reserveTime, function (error, newUnit) {
                $scope.error = error;
                if (!error) {
                    if (reserve) {
                        $scope.reservationList.push(newUnit);
                    }
                    else {
                        //update public window if new unit is inserted into an empty list
                        if ($scope.waitingList[typeId].length == 0 && publicWindow) {
                            publicWindow.lastReplacedUnit = newUnit;
                            publicWindow.lastReplacedUnitPrefix = newUnit.unitId.charAt(0);
                        }

                        $scope.waitingList[typeId].push(newUnit);
                    }

                    $scope.newReserve = {time: new Date()};
                    $scope.reserveForm.$setPristine();
                    $("li[typeId=" + typeId + "]").hide();
                    $("li[typeId=" + typeId + "]").slideDown();
                }
            });
        };

        $scope.openConfirmation = function (units, idx, type) {
            var modal = $modal.open({
                templateUrl: 'confirmationModal.html',
                size: 'sm',
                controller: confirmationModalController,
                resolve: {
                    queueUnit: function () {
                        return units[idx];
                    }
                }
            });

            modal.result.then(function () {
                $scope.remove(units, idx, type);
            }, function () {

            });
        };

        $scope.openPrintView = function (unit, partyType) {
            var printWindow = $window.open('#/printNumber/' + unit.unitId);
            if (partyType) {
                printWindow.printPartyTypeDescription = partyType.partyTypeDescription;
            } else {
                var prefix = unit.unitId.charAt(0);
                for (var i = 0; i < $scope.partyTypeList.length; i++) {
                    var partyType = $scope.partyTypeList[i];
                    if (prefix == partyType.unitIdPrefix) {
                        printWindow.printPartyTypeDescription = "(预约)" + partyType.partyTypeDescription;
                        break;
                    }
                }
            }
            printWindow.printUnitId = unit.unitId;
        };
        _updateData();
        _nextUpdate();
    }
]);

var confirmationModalController = function ($scope, $modalInstance, queueUnit) {
    $scope.unit = queueUnit;
    $scope.ok = function () {
        $modalInstance.close();
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }
};

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

            //handle removal first
            if ($window.lastReplacedUnitPrefix) {
                $scope.lastCalledNumbers[$window.lastReplacedUnitPrefix] = $window.lastReplacedUnit ? $window.lastReplacedUnit.unitId : "--";
                $window.lastReplacedUnitPrefix = null;
            }

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


ppzRestaurantControllers.controller('printNumberController', ['$scope', '$window', "$rootScope", "$timeout",
    function ($scope, $window, $rootScope, $timeout) {
        $rootScope.excludeHeader = true;
        $scope.partyTypeDescription = $window.printPartyTypeDescription;
        $scope.unitId = $window.printUnitId;
        $timeout(function () {
            window.print();
        }, 0.5);
    }
]);


ppzRestaurantControllers.controller('fileUploader', ['$cookies', '$scope', 'FileUploadService', 'FileUploader',
    function ($cookies, $scope, FileUploadService, FileUploader) {
        var fd = new FormData();
        fd.append('sessionId', $cookies.token);
        fd.append('restaurantId', $scope.restaurantId);
        $scope.uploader = new FileUploader({
            url: FileUploadService.FILE_SERVER_URL,
            formData: [
                {
                    sessionId: $cookies.token
                },
                {
                    restaurantId: $scope.restaurantId
                },
                {
                    userId: $cookies.username
                },
                {
                    pictureComment: undefined
                }
            ]
        });
//        $scope.upload = function () {
//            FileUploadService.upload($scope.files, $scope.restaurantId);
//        }
        $scope.filePathList = [];
        $scope.uploader.onSuccessItem = function (item, response, status, headers) {
            var results = JSON.parse(response.data).results;
            $scope.filePathList.push(results[0].filePath);
        }
    }
]);
ppzRestaurantControllers.controller('manageAccountController', ['$cookies', '$scope', 'manageAccountService',
    function ($cookies, $scope, manageAccountService) {
        $scope.submitted = false;
        $scope.modifyPasswordForm = {
            oldPassword: "",
            newPassword: "",
            againPassword: ""
        };
        $scope.modifyPasswordStatus = $scope.REQUEST_STATUS.REQUESTING;
        $scope.modifyPassword = function (valid) {
            $scope.submitted = true;
            if (valid && $scope.modifyPasswordForm.newPassword === $scope.modifyPasswordForm.againPassword) {
                manageAccountService.modifyPassword($scope.modifyPasswordForm.oldPassword, $scope.modifyPasswordForm.newPassword, function () {
                    $scope.modifyPasswordStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                });
            }
        };
    }
]);
