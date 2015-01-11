"use strict"

define(function (require) {
    var app = require("app")
    require("./service")
    app.controller('manageAccountController', ['$cookies', '$scope', 'manageAccountService',
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
                    manageAccountService.modifyPassword($scope.modifyPasswordForm.oldPassword, $scope.modifyPasswordForm.newPassword)
                        .success(function () {
                            $scope.modifyPasswordStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                        }).error(function (data) {
                            $scope.modifyPasswordStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                            if (angular.isObject(data) && data.code == 17) {
                                $scope.failHint = "旧密码不正确";
                            }
                        })
                }
            };
            $scope.modifyEmailStatus = $scope.REQUEST_STATUS.INIT;
            $scope.wantModifyEmail = false;
            $scope.modifyEmail = function (valid) {
                $scope.wantModifyEmail = true;
                $scope.modifyEmailStatus = $scope.REQUEST_STATUS.INIT;
                if (valid) {
                    $scope.modifyEmailStatus = $scope.REQUEST_STATUS.REQUESTING;
                    manageAccountService.modifyEmail($scope.email).
                        success(function () {
                            $scope.modifyEmailStatus = $scope.REQUEST_STATUS.REQUEST_SUCCESSED;
                        }).
                        error(function () {
                            $scope.modifyEmailStatus = $scope.REQUEST_STATUS.REQUEST_FAILED;
                            $scope.modifyEmailHint = "修改email失败";
                        })
                }
            };
            manageAccountService.getUserInfo().then(function (data) {
                $scope.email = data.results[0].email;
            });
        }
    ])
})