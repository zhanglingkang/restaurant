"use strict"

define(function (require) {
    var app = require("app")
    require("./service")
    app.controller('manageAccountController', ['$cookies', '$scope', 'manageAccountService', 'httpService',
        function ($cookies, $scope, manageAccountService, httpService) {
            manageAccountService.modifyPassword = manageAccountService.modifyPassword.setRequestStatus($scope, "modifyPasswordStatus")
            manageAccountService.modifyEmail = manageAccountService.modifyPassword.setRequestStatus($scope, "modifyPasswordStatus")
            $scope.submitted = false
            $scope.modifyPasswordForm = {
                oldPassword: "",
                newPassword: "",
                againPassword: ""
            }
            $scope.modifyPasswordStatus = $scope.REQUEST_STATUS.INIT
            $scope.modifyPassword = function (valid) {
                $scope.submitted = true
                if (valid && $scope.modifyPasswordForm.newPassword === $scope.modifyPasswordForm.againPassword) {
                    manageAccountService.modifyPassword($scope.modifyPasswordForm.oldPassword, $scope.modifyPasswordForm.newPassword)
                        .error(function (data) {
                            if (angular.isObject(data) && data.code == httpService.PPZ_CODE.OLD_PASSWORD_ERROR) {
                                $scope.failHint = "旧密码不正确"
                            }
                        })
                }
            }
            $scope.modifyEmailStatus = $scope.REQUEST_STATUS.INIT
            $scope.wantModifyEmail = false
            $scope.modifyEmail = function (valid) {
                $scope.wantModifyEmail = true
                if (valid) {
                    manageAccountService.modifyEmail($scope.email).
                        error(function () {
                            $scope.modifyEmailHint = "修改email失败"
                        })
                }
            }
            manageAccountService.getUserInfo().then(function (data) {
                $scope.email = data.results[0].email
            })
        }
    ])
})