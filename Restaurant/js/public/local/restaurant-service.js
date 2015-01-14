"use strict"
define(function (require) {
    var app = require("app")
    app.service('restaurantService', ['$http', '$window', '$q', '$cookies', 'httpService',
        function ($http, $window, $q, $cookies, httpService) {
            var getRestaurantListDefered
            return {
                getMyRestaurantList: function () {
                    var _this = this
                    if (!getRestaurantListDefered) {
                        getRestaurantListDefered = httpService.post({
                            command: "getManagingRestaurants"
                        })
                        getRestaurantListDefered.then(function (data) {
                        }, function (error) {
                            console.log('businessError:getManagingRestaurants: ' + error)
                            getRestaurantListDefered = null
                        })
                    }
                    return getRestaurantListDefered
                },
                /**
                 * 清空某个餐厅的等候队列
                 * @param restaurantId
                 */
                resetWaitingList: function (restaurantId) {
                    return httpService.post({
                        command: "resetWaitingList",
                        data: {
                            restaurantId: restaurantId
                        }
                    })
                },
                getRestaurant: function (restaurantId) {
                    var defer = $q.defer()
                    this.getMyRestaurantList().then(function (data) {
                        for (var i = 0; i < data.results.length; ++i) {
                            if (data.results[i].restaurantId === restaurantId) {
                                defer.resolve(data.results[i])
                                break
                            }
                        }
                        if (i == data.results.length) {
                            defer.reject("没找到对应餐厅")
                        }
                    }, function (error) {
                        defer.reject(error)
                    })
                    return defer.promise
                },
                /**
                 *
                 * @param {Boolean} enable
                 */
                acceptReservation: function (restaurantId, enable) {
                    return httpService.post({
                        command: "modifyRestaurantInfo",
                        data: {
                            restaurantId: restaurantId,
                            acceptReservation: enable
                        }
                    })
                },
                enableQueue: function (restaurantId, enable) {
                    return httpService.post({
                        command: "modifyRestaurantInfo",
                        data: {
                            restaurantId: restaurantId,
                            enableQueue: enable
                        }
                    })
                },
                /**
                 *
                 * @param restaurantId
                 * @param {number} length
                 */
                setMaxQueue: function (restaurantId, length) {
                    return httpService.post({
                        command: "modifyRestaurantInfo",
                        data: {
                            restaurantId: restaurantId,
                            maxQueueLength: length
                        }
                    })
                },
                updateRestaurantInfo: function (restaurantId, info) {
                    return httpService.post({
                        command: "modifyRestaurantInfo",
                        data: {
                            restaurantId: restaurantId,
                            "phone.number": info.phone.phone,
                            email: info.email,
                            website: info.website,
                            restaurantDescription: info.restaurantDescription,
                            "address.city": info.address.city,
                            "address.location": info.address.location,
                            "address.state": info.address.state,
                            "address.street": info.address.street,
                            "address.zipcode": info.address.zipcode
                        }
                    })
                },

                getWaitingList: function (restaurantId, callback) {
                    return httpService.post({
                        command: "allUnitInfo",
                        data: {
                            restaurantId: restaurantId
                        }
                    }).success(function (data) {
                        callback(null, data.results[0])
                    }).error(function (error) {
                        console.log('encounted error in queryRestaurantQueue: ' + error)
                        callback(error)
                    })
                }
            }
        }
    ])

})