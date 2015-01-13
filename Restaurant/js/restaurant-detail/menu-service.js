"use strict"

define(function (require) {
    var app = require("app")
    app.service('menuService', [
        '$http', '$window', '$cookies', 'httpService',
        function ($http, $window, $cookies, httpService) {
            var getMenuPromiseMap = {}
            return {
                getMenu: function (restaurantId) {
                    var _this = this
                    if (!getMenuPromiseMap[restaurantId]) {
                        getMenuPromiseMap[restaurantId] = httpService.post({
                            command: "getRestaurantMenu",
                            data: {
                                restaurantId: restaurantId
                            }
                        }).error(function (error) {
                            console.log('encounted error in getRestaurantMenu: ' + error)
                            getMenuPromiseMap[restaurantId] = null
                        })
                    }
                    return getMenuPromiseMap[restaurantId]
                },
                importMenu: function (file, restaurantId) {
                    return httpService.post({
                        url: httpService.MENU_IMPORT_URL,
                        isForm: true,
                        data: {
                            file: file,
                            restaurantId: restaurantId
                        },
                        config: {
                            transformRequest: angular.identity,
                            headers: {'Content-Type': undefined}
                        }
                    })
                },
                /**
                 *
                 * @param {Object} menuCategoryForm
                 * @param {string} menuCategoryForm.categoryName
                 * @param {string} menuCategoryForm.categoryDescription
                 * @param {string} restaurantId
                 */
                addMenuCategory: function (menuCategoryForm, restaurantId) {
                    return httpService.post({
                        command: "createMenuCategory",
                        data: angular.extend(menuCategoryForm, {
                            restaurantId: restaurantId
                        })
                    })
                },
                /**
                 *
                 * @param {Object} menuCategoryForm
                 * @param {string} menuCategoryForm.categoryName
                 * @param {string} menuCategoryForm.categoryDescription
                 * @param {string} menuCategoryForm.categoryId
                 * @param {string} restaurantId
                 */
                modifyMenuCategory: function (menuCategoryForm, restaurantId) {
                    return httpService.post({
                        command: "modifyMenuCategory",
                        data: angular.extend(menuCategoryForm, {
                            restaurantId: restaurantId
                        })
                    })
                },
                /**
                 *
                 * @param {string} categoryId
                 * @param {string} restaurantId
                 */
                removeMenuCategory: function (categoryId, restaurantId) {
                    return httpService.post({
                        command: "deleteMenuCategory",
                        data: {
                            restaurantId: restaurantId,
                            categoryId: categoryId
                        }
                    })
                },
                /**
                 *
                 * @param {Object} menuItemForm
                 * @param {string} menuItemForm.categoryId
                 * @param {string} menuItemForm.itemName
                 * @param {string} menuItemForm.itemDescription
                 * @param {string} menuItemForm.price
                 * @param restaurantId
                 */
                addMenuItem: function (menuItemForm, restaurantId) {
                    return httpService.post({
                        command: "createMenuItem",
                        data: angular.extend(menuItemForm, {
                            restaurantId: restaurantId
                        })
                    })
                },
                /**
                 *
                 * @param {Object} menuItemForm
                 * @param {string} menuItemForm.itemId
                 * @param {string} menuItemForm.categoryId
                 * @param {string} menuItemForm.itemName
                 * @param {string} menuItemForm.itemDescription
                 * @param {string} menuItemForm.price
                 * @param restaurantId
                 */
                modifyMenuItem: function (menuItemForm, restaurantId) {
                    return httpService.post({
                        command: "modifyMenuItem",
                        data: angular.extend(menuItemForm, {
                            restaurantId: restaurantId
                        })
                    })
                },
                removeMenuItem: function (menuItemForm, restaurantId) {
                    return httpService.post({
                        command: "deleteMenuItem",
                        data: angular.extend(menuItemForm, {
                            restaurantId: restaurantId
                        })
                    })
                },
                /**
                 *
                 * @param {Object} sortForm
                 * @param {string} sortForm.categoryId
                 * @param {string} sortForm.previousCategoryId
                 * @param restaurantId
                 */
                sortMenuCategory: function (sortForm, restaurantId) {
                    return httpService.post({
                        command: "pivotMenuCategory",
                        data: angular.extend(sortForm, {
                            restaurantId: restaurantId
                        })
                    })
                },
                /**
                 *
                 * @param {Object} sortForm
                 * @param {string} sortForm.itemId
                 * @param {string} sortForm.previousItemId
                 * @param {string} sortForm.categoryId
                 * @param restaurantId
                 */
                sortMenuItem: function (sortForm, restaurantId) {
                    return httpService.post({
                        command: "pivotMenuItem",
                        data: angular.extend(sortForm, {
                            restaurantId: restaurantId
                        })
                    })
                }
            }
        }])

})