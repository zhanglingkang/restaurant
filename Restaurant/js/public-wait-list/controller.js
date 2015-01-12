"use strict"

define(function (require) {
    var app = require("app")
    app.controller('publicWaitListController', ['$rootScope', '$scope', '$timeout', '$window',
        function ($rootScope, $scope, $timeout, $window) {
            $window.addEventListener("message", function (event) {
                var data = event.data.data
                switch (event.data.type) {
                    case "initData":
                        initData(data)
                        break
                    case "call":
                        $scope.lastCalledNumbers[data.unitIdPrefix] = data.unit.unitId
                        $scope.panelTypes[data.unitIdPrefix] = "panel-primary animate-flicker"
                        $timeout(function () {
                            $scope.panelTypes[data.unitIdPrefix] = "panel-primary"
                        }, 10000)
                        break
                }
                $scope.$apply()
            })
            /**
             *
             * @param {Object} data {partyTypes:[],lastCalledNumbers:{}}
             */
            function initData(data) {
                data = data || $window.data
                angular.forEach(data, function (value, key) {
                    $scope[key] = value
                })
            }

            initData()
            $rootScope.excludeHeader = true
            $rootScope.disableReservationHint = true
            $scope.panelTypes = {}
            for (var i = 0; i < $scope.partyTypes.length; i++) {
                var party = $scope.partyTypes[i]
                $scope.panelTypes[party.unitIdPrefix] = "panel-info"
            }
            console.log(JSON.stringify($scope.lastCalledNumbers))
        }
    ])
})