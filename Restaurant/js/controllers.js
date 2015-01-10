/**
 * Created by Chris on 2/2/14.
 */
;
(function () {


    var ppzRestaurantControllers = angular.module("ppzControllers", []);
    var reservationCtrl = ["$scope", "reservationService" , "dataService", "$location", "$mdBottomSheet", "RestaurantService" , "queueMap", function ($scope, reservationService, dataService, $location, $mdBottomSheet, RestaurantService, queueMap) {
        $scope.reservationMap = [];
        $scope.restaurantList = [];

        angular.forEach(queueMap, function (queue, restaurantId) {
            RestaurantService.getRestaurant(restaurantId).then(function (restaurant) {
                $scope.restaurantList.push(restaurant);
            });
            $scope.reservationMap[restaurantId] = queue.reservationList.filter(function (item) {
                return item.reservationStatus === dataService.reservationStatus.waitConfirm;
            });
        });
        $scope.viewReservationDetail = function (restaurant) {
            $location.path("/waitinglist/" + restaurant.restaurantId);
            $mdBottomSheet.hide();
        };

    }];
    ppzRestaurantControllers.controller('appController', ["$rootScope", "$scope", '$cookies', "$location", "pubSubService" , "$mdBottomSheet", "$mdToast", "reservationService", "utilService", "audioService", "dataService", "notificationService",
        function ($rootScope, $scope, $cookies, $location, pubSubService, $mdBottomSheet, $mdToast, reservationService, utilService, audioService, dataService, notificationService) {
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
            $rootScope.showCover = false;
            $rootScope.alertType = "alert-info";
            $rootScope.alertContent = "";
            /**
             *
             * @param {Object} config
             * @param {String} config.alertType
             * @param {String} config.alertContent
             * @param {Boolean} config.showCover
             */
            $rootScope.setAlert = function (config) {
                $rootScope.showCover = config.showCover || false;
                $rootScope.alertType = config.alertType || "alert-info";
                $rootScope.alertContent = config.alertContent || "";
            };
            var tip = function (data) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(data.msg)
                        .position("right bottom")
//                        .hideDelay(0)
                );
            }
            pubSubService.subscribe("businessError", tip);
            pubSubService.subscribe("serverError", tip);
            pubSubService.subscribe("businessSuccess", tip);
            /**
             * 判断当前用户是否已登录
             */
            function isLogined() {
                return !!($cookies.token && $cookies.token !== "null");
            }

            $scope.isLogined = isLogined;
            $scope.$on("$locationChangeStart", function (event, newUrl, oldUrl) {
                if (!isLogined() && !/login/.test(newUrl)) {
                    $location.path("/login");
                }
            });
            $scope.showReservationList = function () {
                var $mdBottomSheetPromise = $mdBottomSheet.show({
                    templateUrl: 'partials/reservationToastList.html',
                    controller: 'reservationCtrl',
                    locals: {
                        queueMap: reservationService.getQueueMap()
                    }
                });
            };
            function getReservationMap(queueMap) {
                var reservationMap = {};
                angular.forEach(queueMap, function (queue, restaurantId) {
                    reservationMap[restaurantId] = queue.reservationList;
                });
                return reservationMap;
            }

            function getWaitConfirmReservationNum(queueMap) {
                var reservationMap = getReservationMap(queueMap);
                var sum = 0;
                angular.forEach(reservationMap, function (reservationList, restaurantId) {
                    reservationList.forEach(function (reservation) {
                        sum += reservation.reservationStatus === dataService.reservationStatus.waitConfirm ? 1 : 0;
                    })
                });
                return sum;
            }

            var audio;
            if (!$rootScope.disableReservationHint) {
                pubSubService.subscribe("newReservation", function (queueMap) {
                    var waitConfirmReservationNum = getWaitConfirmReservationNum(queueMap);
                    if (waitConfirmReservationNum > 0) {
                        notificationService.create('预约消息', {
                            body: '一共收到' + waitConfirmReservationNum + '条预约消息',
                            icon: 'img/ppz.jpg',
                            tag: "tip"
                        }).then(function (notification) {
                            notification.onclick = function () {
                                console.log("notification");
                                top.window.focus();
                            }
                        });
                        if (!audio) {
                            audio = audioService.create({
                                src: "img/tip.ogg"
                            })
                        }
                        audio.play();
                    }
                });
            }
            if (isLogined()) {
                reservationService.connect();
            }
        }]);
    ppzRestaurantControllers.controller('loginController', ['$scope', 'Login', '$window', '$location', '$cookies', 'reservationService',
        function ($scope, Login, $window, $location, $cookies, reservationService) {
            $scope.getUserName = function () {
                return $cookies.username;
            };
            $scope.resetPasswordForm = {
                userName: ""
            };
            $scope.submitted = false;
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
                    }, function (data) {
                        $scope.resetStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                        $scope.resetHint = data.message;
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
                        reservationService.connect();
                    }, function (result) {
                        $scope.loginStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                        console.log("login failed " + result);
                    }
                );
            };

            $scope.logout = function () {
                Login.logout(function () {
                    //$location.path("/login");
                    location.reload();
                });
            }
        }
    ]);

    ppzRestaurantControllers.controller('restaurantListController', ['$scope', 'RestaurantService', "MenuService", "pubSubService",
        function ($scope, RestaurantService, MenuService, pubSubService) {
            $scope.loading = true;
            $scope.includeHeader = true;
            RestaurantService.getMyRestaurantList().then(function (data) {
                $scope.loading = false;
                $scope.restaurantList = data.results;
                console.log("loading restaurantList");
                pubSubService.publish("loadedRestaurantList", $scope.restaurantList);
                //这里加载菜单式预加载菜单，缓解管理页面的性能问题。
                $scope.restaurantList.forEach(function (restaurant) {
                    MenuService.getMenu(restaurant.restaurantId);
                });
            }, function (error) {
                $scope.error = error;
            });
        }
    ]);

    ppzRestaurantControllers.controller('restaurantDetailController', ['$scope', '$routeParams', 'RestaurantService', 'MenuService',
        function ($scope, $routeParams, RestaurantService, MenuService) {
            $scope.goBack = function () {
                window.history.back();
            }
            $scope.restaurantId = $routeParams.restaurantId;
            RestaurantService.getRestaurant($scope.restaurantId).then(function (restaurant) {
                $scope.restaurant = restaurant;
                $scope.newInfo = angular.copy($scope.restaurant);
            }, function (error) {
                $scope.error = error;
            });
            $scope.editing = false;
            $scope.edit = function () {
                $scope.editing = true;
            };
            $scope.cancel = function () {
                $scope.newInfo = angular.copy($scope.restaurant);
                $scope.editing = false;
            };
            $scope.confirm = function () {
                $scope.editing = false;
                RestaurantService.updateRestaurantInfo($scope.restaurantId, $scope.newInfo).then(function () {
                    $scope.saved = true;
                }, function () {
                    $scope.saved = false;
                })
            }
        }
    ]);

    ppzRestaurantControllers.controller('menuController', ['$scope', 'MenuService', '$timeout',
        function ($scope, MenuService, $timeout) {
            /**
             * 表示正在添加菜单类型
             * @type {boolean}
             */
            $scope.adding = false;
            /**
             * 导入的菜单文件列表 元素为File对象
             * @type {Array}
             */
            $scope.importMenuFile = [];
            /**
             * 当点击了确定按钮欲发送导入请求时为true。
             * @type {boolean}
             */
            $scope.wantImport = false;
            $scope.importStatus = $scope.REQUEST_STATUS.INIT;
            $scope.isExcel = function () {
                return /application\/.+office.+/.test($scope.importMenuFile[0].type);
            };
            $scope.importMenu = function () {
                $scope.wantImport = true;
                if ($scope.importMenuFile.length > 0 && $scope.isExcel()) {
                    $scope.importStatus = $scope.REQUEST_STATUS.REQUESTING;
                    MenuService.importMenu($scope.importMenuFile[0], $scope.restaurantId).then(
                        function () {
                            $scope.importStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                        }, function (data) {
                            $scope.importStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                        });
                }
            };
            $scope.sortMenuCategoryStatus = $scope.REQUEST_STATUS.INIT;
            $scope.sortMenuCategory = function (data) {
                var previousCategoryId = null;
                var sortList = data.sortList;
                sortList.forEach(function (item, index) {
                    if (item.id === data.dragNodeId) {
                        if (index > 0) {
                            previousCategoryId = data.sortList[index - 1].id;
                        }
                    }
                });
                $scope.sortMenuCategoryStatus = $scope.REQUEST_STATUS.REQUESTING;
                $scope.setAlert({
                    showCover: true,
                    alertContent: "排序中..."
                });
                MenuService.sortMenuCategory({
                    categoryId: data.dragNodeId,
                    previousCategoryId: previousCategoryId
                }, $scope.menu.restaurantId).then(function (data) {
                    $scope.sortMenuCategoryStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                    var menuCategoryList = [];
                    sortList.forEach(function (item, index) {
                        menuCategoryList.push($scope.getMenuCategory(item.id));
                    });
                    $scope.menu.menuCategories = menuCategoryList;
                    $scope.setAlert({
                        showCover: false
                    });
                }, function () {
                    $scope.sortMenuCategoryStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                    $scope.setAlert({
                        showCover: true,
                        alertContent: "操作失败"
                    });
                });
            };
            /**
             * @method 从$scope.menu.menuCategories中获取menuCategory
             * @param {String} menuCategoryId
             */
            $scope.getMenuCategory = function (menuCategoryId) {
                var menuCategory;
                $scope.menu.menuCategories.some(function (item) {
                    if (item.categoryId === menuCategoryId) {
                        menuCategory = item;
                        return true;
                    }
                });
                return menuCategory;
            };
            $scope.refreshMenu = function () {
                MenuService.getMenu($scope.restaurantId).then(function (data) {
                    setMenu(data.results[0]);
                }, function (error) {
                    $scope.error = error;
                });
            };
            $scope.refreshMenu();
            /**
             * @method setMenu
             * @description 这个方法是为了缓解性能问题，将赋值操作分散在多个事件处理器中执行
             * @param {Object} menu
             */
            function setMenu(menu) {
                $scope.menu = menu;
                return;
                $scope.menu = {
                    "@class": menu["@class"],
                    menuCategories: [],
                    restaurantId: menu["restaurantId"]
                };
                var size = 1;
                var count = parseInt(menu.menuCategories.length / size + 1);
                var index = 0;

                function appendMenu() {
                    $scope.menu.menuCategories = $scope.menu.menuCategories.concat(menu.menuCategories.slice(index * size, index * size + size));
                    index++;
                    if (index != count) {
                        $timeout(appendMenu, 0);
                    } else {
                        console.log("menuCount" + $scope.menu.menuCategories.length);
                    }
                }

                $timeout(appendMenu, 0);
            }

            /**
             *
             * @param {Boolean} collapse
             */
            $scope.collapseAll = function (collapse) {
                $scope.$broadcast("collapse", collapse);
            };
            $scope.toAddMenuCategory = function () {
                $scope.adding = true;
                $scope.addStatus = $scope.REQUEST_STATUS.INIT;
                initCategoryForm();
            };
            function initCategoryForm() {
                /**
                 * 欲提交的类型表单
                 * @type {{categoryName: string, categoryDescription: string}}
                 */
                $scope.categoryForm = {
                    categoryName: "",
                    categoryDescription: ""
                };
            }

            initCategoryForm();
            $scope.addStatus = $scope.REQUEST_STATUS.INIT;
            $scope.addMenuCategory = function () {
                $scope.addStatus = $scope.REQUEST_STATUS.REQUESTING;
                MenuService.addMenuCategory($scope.categoryForm, $scope.menu.restaurantId).then(function (data) {
                    initCategoryForm();
                    $scope.addStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                    $scope.menu.menuCategories = $scope.menu.menuCategories.concat(data.results);
                    $scope.adding = false;
                }, function () {
                    $scope.addStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                });
            };

        }
    ]);

    ppzRestaurantControllers.controller('menuCategoryController', ['$scope', 'MenuService',
        function ($scope, MenuService) {
            var items = [];
            $scope.addingNewItem = false;
            $scope.editing = false;
            $scope.nameModified = $scope.category.categoryName;
            $scope.descriptionModified = $scope.category.categoryDescription;
            $scope.editCategory = function () {
                $scope.editing = true;
                $scope.editStatus = $scope.REQUEST_STATUS.INIT;
            };

            $scope.confirmEditCategory = function () {
                $scope.editStatus = $scope.REQUEST_STATUS.REQUESTING;
                MenuService.modifyMenuCategory({
                    categoryName: $scope.nameModified,
                    categoryDescription: $scope.descriptionModified,
                    categoryId: $scope.category.categoryId
                }, $scope.menu.restaurantId).then(function () {
                    $scope.editStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                    $scope.category.categoryName = $scope.nameModified;
                    $scope.category.categoryDescription = $scope.descriptionModified;
                    $scope.editing = false;
                }, function () {
                    $scope.editStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                });
            };

            $scope.sortMenuItem = function (data) {
                var previousItemId = null;
                var sortList = data.sortList;
                $scope.setAlert({
                    showCover: true,
                    alertContent: "排序中..."
                });
                sortList.forEach(function (item, index) {
                    if (item.id === data.dragNodeId) {
                        if (index > 0) {
                            previousItemId = data.sortList[index - 1].id;
                        }
                    }
                });
                MenuService.sortMenuItem({
                    itemId: data.dragNodeId,
                    previousItemId: previousItemId,
                    categoryId: $scope.category.categoryId
                }, $scope.menu.restaurantId).then(function () {
                    var menuItemList = [];
                    sortList.forEach(function (item, index) {
                        menuItemList.push($scope.getMenuItem(item.id));
                    });
                    $scope.category.items = menuItemList;
                    $scope.setAlert({
                        showCover: false
                    });
                });
            };
            /**
             * @method 从$scope.category.items中获取menuItem
             * @param {String} menuItemId
             */
            $scope.getMenuItem = function (menuItemId) {
                var menuItem;
                $scope.category.items.some(function (item) {
                    if (item.itemId === menuItemId) {
                        menuItem = item;
                        return true;
                    }
                });
                return menuItem;
            };
            $scope.deleteStatus = $scope.REQUEST_STATUS.INIT;
            $scope.removeMenuCategory = function () {
                $scope.deleteStatus = $scope.REQUEST_STATUS.REQUESTING;
                MenuService.removeMenuCategory(
                    $scope.category.categoryId,
                    $scope.menu.restaurantId).then(function () {
                        $scope.editStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                        $scope.menu.menuCategories = $scope.menu.menuCategories.filter(function (category) {
                            return category.categoryId !== $scope.category.categoryId;
                        });
                    }, function () {
                        $scope.editStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                    });
            };
            $scope.$on("collapse", function ($event, collapse) {
//            if (collapse) {
//                items = $scope.category.items;
//                $scope.category.items = [];
//            } else {
//                $scope.category.items = items;
//            }
                $scope.collapse = collapse;
            });
            $scope.cancelEditCategory = function () {
                $scope.nameModified = $scope.category.categoryName;
                $scope.descriptionModified = $scope.category.categoryDescription;
                $scope.categoryEditForm.$setPristine();
                $scope.editing = false;
            };
            $scope.addNewItem = function () {
                if ($scope.addingNewItem) {
                    return;
                }
                $scope.addingNewItem = true;
                $scope.addMenuItemStatus = $scope.REQUEST_STATUS.INIT;
                $scope.menuItemForm = {};
                $scope.menuItemFormValidation.$setPristine();
            };
            $scope.confirmAddItem = function (valid) {
                if (valid) {
                    $scope.addMenuItemStatus = $scope.REQUEST_STATUS.REQUESTING;
                    MenuService.addMenuItem(angular.extend($scope.menuItemForm, {
                        categoryId: $scope.category.categoryId
                    }), $scope.menu.restaurantId).then(function (data) {
                        $scope.addMenuItemStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                        $scope.category.items = $scope.category.items.concat(data.results);
                        $scope.addingNewItem = false;
                    }, function () {
                        $scope.addMenuItemStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                    });
                }
            };
            $scope.cancelAddItem = function () {
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
                $scope.editMenuItemStatus = $scope.REQUEST_STATUS.REQUESTING;
                MenuService.modifyMenuItem({
                        itemId: $scope.newItem.itemId,
                        itemName: $scope.newItem.itemName,
                        itemDescription: $scope.newItem.itemDescription,
                        price: $scope.newItem.price,
                        categoryId: $scope.category.categoryId
                    }, $scope.menu.restaurantId
                ).then(
                    function () {
                        $scope.editMenuItemStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                        $scope.item.itemName = $scope.newItem.itemName;
                        $scope.item.itemDescription = $scope.newItem.itemDescription;
                        $scope.item.price = $scope.newItem.price;
                        $scope.editing = false;
                    }, function () {
                        $scope.editMenuItemStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                    });
            };
            $scope.cancelEditItem = function () {
                $scope.newItem = angular.copy($scope.item);
                $scope.editing = false;
            };
            $scope.removeItem = function () {
                MenuService.removeMenuItem({
                    itemId: $scope.item.itemId,
                    categoryId: $scope.category.categoryId
                }, $scope.menu.restaurantId).then(function () {
                    $scope.category.items = $scope.category.items.filter(function (menuItem) {
                        return menuItem.itemId !== $scope.item.itemId;
                    });
                });
            };
        }
    ])
    ;

    ppzRestaurantControllers.controller('waitingListController', [
        '$modal', '$scope', '$routeParams', '$timeout', '$cookies', '$window', '$mdToast', 'RestaurantService', 'WaitingListService', "utilService", "reservationService", "pubSubService", "reservationService", "dataService", "$filter", "speechService",
        function ($modal, $scope, $routeParams, $timeout, $cookies, $window, $mdToast, RestaurantService, WaitingListService, utilService, reservationService, pubSubService, reservationService, dataService, $filter, speechService) {
            $scope.restaurantId = $routeParams.restaurantId;
            var UPDATE_INTERVAL = 10000;
            var publicWindow = null;
            $scope.goBack = function () {
                window.history.back();
            }
            $scope.reservationTypeMap = {
                reservationDesk: {
                    text: "预约留台",
                    value: "1"
                },
                reservationRoom: {
                    text: "预约房间",
                    value: "2"
                }
            }
            $scope.reservationTypeArray = utilService.getArray($scope.reservationTypeMap)
            $scope.newReserve = {
                time: new Date(),
                typeId: "",
                reservableId: "",
                number: "",
                reservationType: $scope.reservationTypeMap.reservationDesk.value
            };
            RestaurantService.getRestaurant($scope.restaurantId).then(function (restaurant) {
                $scope.partyTypeList = restaurant.partyTypeInfos;
                $scope.newReserve.typeId = $scope.partyTypeList[0].partyTypeId;
                $scope.restaurant = restaurant;
                $scope.newReserve.reservableId = $scope.restaurant.reservableRooms[0] ? $scope.restaurant.reservableRooms[0].reservableId : ""
                $scope.maxQueueLength = restaurant.restaurantSettings.maxQueueLength;
            }, function (error) {
                $scope.error = error;
            });
            $scope.resetWaitingList = function () {
                RestaurantService.resetWaitingList($scope.restaurantId).success(function () {
                    _updateData();
                });
            };
            $scope.setMaxQueue = function (valid) {
                if (valid) {
                    RestaurantService.setMaxQueue($scope.restaurantId, $scope.maxQueueLength).success(function () {
                        $scope.restaurant.restaurantSettings.maxQueueLength = $scope.maxQueueLength;
                        $scope.modifyMaxQueuePopover.close();
                    });
                }
            };
            $scope.stopReservation = function () {
                RestaurantService.acceptReservation($scope.restaurantId, false).success(function () {
                    $scope.restaurant.restaurantSettings.acceptReservation = false;
                });
            };
            $scope.startReservation = function () {
                RestaurantService.acceptReservation($scope.restaurantId, true).success(function () {
                    $scope.restaurant.restaurantSettings.acceptReservation = true;
                });
            };
            $scope.stopQueue = function () {
                RestaurantService.enableQueue($scope.restaurantId, false).success(function () {
                    $scope.restaurant.restaurantSettings.enableQueue = false;
                });
            };
            $scope.startQueue = function () {
                RestaurantService.enableQueue($scope.restaurantId, true).success(function () {
                    $scope.restaurant.restaurantSettings.enableQueue = true;
                });
            };
            $scope.waitingList = [];
            Date.prototype.toString = function () {
                return $filter("date")(this, "yyyy-MM-dd");
            };

            var _updateData = function () {
                RestaurantService.getWaitingList($scope.restaurantId, function (error, allList) {
                    $scope.error = error;
                    $scope.waitingList = allList.waitingList;
                    $scope.reservationList = allList.reservationList;
                    $scope.reservationCompleteList = allList.completeList.filter(function (value) {
                        return !!value.reservationInfo;
                    });
                    $scope.waitingCompleteList = allList.completeList.filter(function (value) {
                        return !value.reservationInfo;
                    });
                });
            };
            _updateData();
            $scope.$on("$destroy", function () {
                pubSubService.unSubscribe("newReservation", _updateData);
            });
            pubSubService.subscribe("newReservation", _updateData);
            $scope.call = function (unit, unitIdPrefix) {
                var msg = speechService.createMsg();
                msg.text = "现在叫号," + unit.unitId;
                speechService.speak(msg);
                WaitingListService.callUser($scope.restaurantId, unit.unitId).success(function (data) {
                    unit.callCount = data.results[0].callCount;
                    pubSubService.publish("businessSuccess", {
                        msg: "已发送"
                    });
                }).error(function (error) {
                });
                if (publicWindow) {
                    publicWindow.postMessage({
                        type: "call",
                        data: {
                            unitIdPrefix: unitIdPrefix,
                            unit: unit
                        }
                    }, window.location.href);
                }

            };
            $scope.openPublicWaitListWindow = function () {
                var feature = "left=0,top=0,width=" + screen.width + ",height=" + screen.height;
                publicWindow = $window.open('#/publicWaitList/' + $scope.restaurantId, "publicWindow", feature);
                publicWindow.focus();
                var data = publicWindow.data = {
                    partyTypes: $scope.partyTypeList,
                    lastCalledNumbers: {

                    }
                };
                for (var i = 0; i < data.partyTypes.length; i++) {
                    var party = data.partyTypes[i];
                    var frontUnit = "--";
                    if ($scope.waitingList[i + 1].length > 0) {
                        frontUnit = $scope.waitingList[i + 1][0].unitId;
                    }
                    data.lastCalledNumbers[party.unitIdPrefix] = frontUnit;
                }
                publicWindow.postMessage({
                    type: "initData",
                    data: data
                }, window.location.href);
            };
            $scope.removeReservation = function (unitId) {
                WaitingListService.removeReservation($scope.restaurantId, unitId).success(function () {
                    $scope.reservationList = $scope.reservationList.filter(function (item) {
                        return item.unitId !== unitId;
                    });
                    _updateData();
                });
            };
            $scope.removeWaiting = function (unitId, key) {
                WaitingListService.removeWaiting($scope.restaurantId, unitId).success(function () {
                    $scope.waitingList[key] = $scope.waitingList[key].filter(function (item) {
                        return item.unitId !== unitId;
                    });
                    _updateData();
                });
            }
            $scope.addUser = function (reserve) {
                var reserveTime = reserve ? $scope.newReserve.time : null;
                var typeId = $scope.newReserve.typeId;
                var promise;
                if ($scope.newReserve.reservationType === $scope.reservationTypeMap.reservationRoom.value) {
                    typeId = 0
                    promise = WaitingListService.reserveRoom(
                        $scope.restaurantId, $scope.newReserve.name, typeId, $scope.newReserve.phone, reserveTime, $scope.newReserve.reservableId, $scope.newReserve.number
                    )
                } else {
                    promise = WaitingListService.addUser(
                        $scope.restaurantId, $scope.newReserve.name, $scope.newReserve.typeId, $scope.newReserve.phone, reserveTime
                    )
                }

                promise.success(function (data) {
                    var newUnit = data.results[0];
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

                    $scope.newReserve = {
                        time: new Date(),
                        typeId: $scope.newReserve.typeId,
                        reservableId: $scope.restaurant.reservableRooms[0] ? $scope.restaurant.reservableRooms[0].reservableId : "",
                        number: "",
                        reservationType: $scope.reservationTypeMap.reservationDesk.value
                    };
                    $scope.reserveForm.$setPristine();
                })
            };
            $scope.reserveRoom = function () {
                var reserveTime = reserve ? $scope.newReserve.time : null;
            }

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
            $scope.reservationStatusMap = dataService.reservationStatus;
            $scope.accept = function (valid, reservation, acceptReason) {
                $scope.submitted = true;
                if (valid) {
                    reservationService.accept({
                        restaurantId: reservation.restaurantId,
                        unitId: reservation.unitId,
                        comment: acceptReason
                    }).success(function (data) {
                        $scope.submitted = false;
                        $scope.$broadcast("closePopover", "acceptPopover");
                        reservation.reservationStatus = dataService.reservationStatus.accept;
                        reservation.reservationComment = acceptReason;
                    });
                }
            };

            $scope.refuse = function (valid, reservation, refuseReason) {
                $scope.submitted = true;
                if (valid) {
                    reservationService.refuse({
                        restaurantId: reservation.restaurantId,
                        unitId: reservation.unitId,
                        comment: refuseReason
                    }).success(function (data) {
                        $scope.submitted = false;
                        $scope.$broadcast("closePopover", "refusePopover");
                        reservation.reservationStatus = dataService.reservationStatus.refuse;
                        reservation.reservationComment = refuseReason;
                    });
                }
            };
            $scope.reservationStatusMap = dataService.reservationStatus;
            // _nextUpdate();
        }
    ])
    ;

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
            $window.addEventListener("message", function (event) {
                var data = event.data.data;
                switch (event.data.type) {
                    case "initData":
                        initData(data);
                        break;
                    case "call":
                        $scope.lastCalledNumbers[data.unitIdPrefix] = data.unit.unitId;
                        $scope.panelTypes[data.unitIdPrefix] = "panel-primary animate-flicker";
                        $timeout(function () {
                            $scope.panelTypes[data.unitIdPrefix] = "panel-info";
                        }, 3000);
                        break;
                }
                $scope.$apply();
            });
            /**
             *
             * @param {Object} data {partyTypes:[],lastCalledNumbers:{}}
             */
            function initData(data) {
                data = data || $window.data;
                angular.forEach(data, function (value, key) {
                    $scope[key] = value;
                });
            }

            initData();
            $rootScope.excludeHeader = true;
            $rootScope.disableReservationHint = true;
            $scope.panelTypes = {};
            for (var i = 0; i < $scope.partyTypes.length; i++) {
                var party = $scope.partyTypes[i];
                $scope.panelTypes[party.unitIdPrefix] = "panel-info";
            }
            console.log(JSON.stringify($scope.lastCalledNumbers));
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
                    $scope.reviewList.forEach(function (review) {
                        review.rating /= 2;
                    });
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
                    }
                ],
                filter: [
                    {
                        name: "commentIsRequired",
                        fn: function (item) {
                            return !!item.pictureComment;
                        }
                    }
                ]
            });
//        $scope.upload = function () {
//            FileUploadService.upload($scope.files, $scope.restaurantId);
//        }
            $scope.fileList = [];
            $scope.uploader.onBeforeUploadItem = function (fileItem) {
                fileItem.formData.push({
                    pictureComment: fileItem.pictureComment
                });
            };
            $scope.upload = function (fileItem) {
                fileItem.wantUpload = true;
                if (fileItem.pictureComment) {
                    fileItem.upload();
                }
            };
            $scope.uploadAll = function () {
                $scope.uploader.queue.forEach(function (item) {
                    if (!item.isSuccess) {
                        $scope.upload(item);
                    }
                });
            };
            $scope.uploader.onSuccessItem = function (item, response, status, headers) {
                var results = JSON.parse(response.data).results;
                $scope.fileList = $scope.fileList.concat(results);
            };
            FileUploadService.getPictures($scope.restaurantId).then(function (data) {
                angular.forEach(data.results[0].uploadedPictures, function (item, index) {
                    $scope.fileList.push(item);
                });
            });
            $scope.removePicture = function (file) {
                FileUploadService.removePicture({
                    restaurantId: $scope.restaurantId,
                    pictureId: file.pictureId
                }).then(function () {
                    $scope.fileList = $scope.fileList.filter(function (item) {
                        return item.pictureId != file.pictureId;
                    })
                });
            }
//        RestaurantService.getMyRestaurantList().then(function (data) {
//            data.results[0].uploadedPictures.forEach(function (picture) {
//                $scope.filePathList.push(picture.filePath);
//            });
//        });
        }
    ]);
    ppzRestaurantControllers.controller('pictureItemController', [
        '$cookies', '$scope', 'FileUploadService', function ($cookies, $scope, FileUploadService) {
            $scope.file.pictureCommentCopy = $scope.file.pictureComment;
            $scope.modifyIntroduce = function (valid) {
                if (valid) {
                    FileUploadService.modifyIntroduce({
                        pictureId: $scope.file.pictureId,
                        pictureComment: $scope.file.pictureCommentCopy,
                        restaurantId: $scope.file.restaurantId
                    }).then(function () {
                        $scope.file.pictureComment = $scope.file.pictureCommentCopy;
                        $scope.popoverScope.close();
                    }, function () {
                    });
                }
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
            $scope.modifyPasswordStatus = $scope.REQUEST_STATUS.INIT;
            $scope.modifyPassword = function (valid) {
                $scope.submitted = true;
                $scope.modifyPasswordStatus = $scope.REQUEST_STATUS.INIT;
                if (valid && $scope.modifyPasswordForm.newPassword === $scope.modifyPasswordForm.againPassword) {
                    $scope.modifyPasswordStatus = $scope.REQUEST_STATUS.REQUESTING;
                    manageAccountService.modifyPassword($scope.modifyPasswordForm.oldPassword, $scope.modifyPasswordForm.newPassword, function () {
                        $scope.modifyPasswordStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                    }, function (data) {
                        $scope.modifyPasswordStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                        if (angular.isObject(data) && data.code == 17) {
                            $scope.failHint = "旧密码不正确";
                        }
                    });
                }
            };
            $scope.modifyEmailStatus = $scope.REQUEST_STATUS.INIT;
            $scope.wantModifyEmail = false;
            $scope.modifyEmail = function (valid) {
                $scope.wantModifyEmail = true;
                $scope.modifyEmailStatus = $scope.REQUEST_STATUS.INIT;
                if (valid) {
                    $scope.modifyEmailStatus = $scope.REQUEST_STATUS.REQUESTING;
                    manageAccountService.modifyEmail($scope.email, function () {
                        $scope.modifyEmailStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                    }, function () {
                        $scope.modifyEmailStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                        $scope.modifyEmailHint = "修改email失败";
                    })
                }
            };
            manageAccountService.getUserInfo().then(function (data) {
                $scope.email = data.results[0].email;
            });
        }
    ]);

    ppzRestaurantControllers.controller("reservationCtrl", reservationCtrl);

}
()
    )