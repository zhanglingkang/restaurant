"use strict";

define(function (require) {
    var app = require("app")
    var confirmationModalController = function ($scope, $modalInstance, queueUnit) {
        $scope.unit = queueUnit;
        $scope.ok = function () {
            $modalInstance.close();
        }

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        }
    }
    app.controller("confirmationModalController", confirmationModalController)
})