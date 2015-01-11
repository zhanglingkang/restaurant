"use strict"

define(function (require) {
    var app = require("app")
    app.service('manageAccountService', [ '$window', '$cookies', 'httpService', function ($window, $cookies, httpService) {
        var modifyAccountInfo = function (data) {
            return httpService.post({
                command: "updateUserInfo",
                data: data
            })
        }
        var getUserInfoDefered;
        return {
            modifyPassword: function (oldPassword, newPassword) {
                var data = {
                    sessionId: $cookies.token,
                    userId: $cookies.username,
                    password: newPassword,
                    oldPassword: oldPassword
                }
                return modifyAccountInfo(data)
            },
            modifyEmail: function (email, success, error) {
                var data = {
                    sessionId: $cookies.token,
                    userId: $cookies.username,
                    email: email
                }
                return modifyAccountInfo(data)
            },
            getUserInfo: function () {
                if (!getUserInfoDefered) {
                    getUserInfoDefered = httpService.post({
                        command: "getUserInfo"
                    }).error(function () {
                        getUserInfoDefered = null;
                    })
                }
                return getUserInfoDefered
            }
        }
    }])
})