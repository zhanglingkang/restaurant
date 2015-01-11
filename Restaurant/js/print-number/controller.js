"use strict"

define(function (require) {
    var app = require("app")
    app.controller('printNumberController', ['$scope', '$window', "$rootScope", "$timeout",
        function ($scope, $window, $rootScope, $timeout) {
            $rootScope.excludeHeader = true
            $rootScope.disableReservationHint = true
            $scope.partyTypeDescription = $window.printPartyTypeDescription
            $scope.unitId = $window.printUnitId
            $timeout(function () {
                window.print()
            }, 0.5)
        }
    ])
})