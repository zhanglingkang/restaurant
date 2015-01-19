"use strict"

define(function (require) {
    var app = require("app")
    require("./service")
    require("public/local/reservation-service")
    app.controller('loginController', [
        '$scope', 'loginService', '$window', '$location', '$cookies', 'reservationService',
        function ($scope, loginService, $window, $location, $cookies, reservationService) {
            $scope.getUserName = function () {
                return $cookies.username
            }
            $scope.resetPasswordForm = {
                userName: ""
            }
            $scope.submitted = false
            $scope.initResetInfo = function () {
                $scope.resetPasswordForm.userName = ""
                $scope.resetStatus = $scope.REQUEST_STATUS.INIT
                $scope.submitted = false
            }
            $scope.resetStatus = $scope.REQUEST_STATUS.INIT
            $scope.resetPassword = function (valid) {
                $scope.submitted = true
                if (valid) {
                    $scope.resetStatus = $scope.REQUEST_STATUS.ING
                    loginService.resetPassword($scope.resetPasswordForm.userName, function (data) {
                        $scope.resetStatus = $scope.REQUEST_STATUS.SUCCESSFUL
                    }, function (data) {
                        $scope.resetStatus = $scope.REQUEST_STATUS.FAILED
                        $scope.resetHint = data.message
                    })
                }
            }
            $scope.loginStatus = $scope.REQUEST_STATUS.INIT
            $scope.performLogin = function () {
                $scope.loginHintShow = true
                $scope.loginStatus = $scope.REQUEST_STATUS.ING
                loginService.login($scope.username, $scope.password).then(
                    function (result) {
                        $scope.loginStatus = $scope.REQUEST_STATUS.SUCCESSFUL
                        console.log("login result " + result)
                        console.log("token " + $cookies.token)
                        $location.path("/myRestaurants")
                        reservationService.connect()
                    }, function (result) {
                        $scope.loginStatus = $scope.REQUEST_STATUS.FAILED
                        console.log("login failed " + result)
                    }
                )
            }

            $scope.logout = function () {
                loginService.logout(function () {
                    //$location.path("/login")
                    location.reload()
                })
            }
        }
    ])

})
