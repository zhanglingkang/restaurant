"use strict"

define(function (require) {
    var app = require("app")
    require("./menu-service")
    require("./menu-manager-directive")
    app.controller('menuController', ['$scope', 'menuService', '$timeout',
        function ($scope, menuService, $timeout) {
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
                    menuService.importMenu($scope.importMenuFile[0], $scope.restaurantId).then(
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
                menuService.sortMenuCategory({
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
                menuService.getMenu($scope.restaurantId).then(function (data) {
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
                menuService.addMenuCategory($scope.categoryForm, $scope.menu.restaurantId).then(function (data) {
                    initCategoryForm();
                    $scope.addStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                    $scope.menu.menuCategories = $scope.menu.menuCategories.concat(data.results);
                    $scope.adding = false;
                }, function () {
                    $scope.addStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                });
            };

        }
    ])
})