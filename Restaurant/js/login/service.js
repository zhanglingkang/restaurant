"use strict"
define(function (require, exports, module) {
    var app = require("app")
    app.factory('loginService', ['$http', '$q', "$window", "$cookies", "httpService",
        function ($http, $q, $window, $cookies, httpService) {
            var loginService = {
                login: function (username, password) {
                    return httpService.post({
                        command: "login",
                        data: {
                            userId: username,
                            password: password
                        },
                        includeSessionId: false
                    }).success(function (jsonData) {
                        var token = jsonData.results[0].sessionId
                        $cookies.token = token
                        $cookies.username = username
                    }).error(function () {
                        $cookies.token = null
                    })
                },
                /**
                 *
                 * @param callback 成功之后的回调
                 */
                logout: function (callback) {
                    return httpService.post({
                        command: "logout"
                    }).success(function () {
                        $cookies.token = null
                        callback()
                    }).error(function (error) {
                        console.log('encounted error in getMyRestaurantList: ' + error)
                    })
                },
                resetPassword: function (userName) {
                    return httpService.post({
                        command: "requestUserPasswordReset",
                        data: {
                            userId: userName
                        }
                    })
                }
            }
            return loginService
        }
    ])
})