"use strict"

define(function (require) {
    var calendar = require("public/general/calendar")
    app.controller('waitingListController', [
        "$scope", function ($scope) {
            var startYear = 2015
            var endYear = new Date().getFullYear() + 1
            $scope.yearList = []
            for (var i = startYear; i <= endYear; i++) {
                $scope.yearList.push(i)
            }
            $scope.monthList = []
            for (var i = 1; i <= 12; i++) {
                $scope.monthList.push(i)
            }
            $scope.date = {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1
            }
            $scope.weekNameList = ["一", "二", "三", "四", "五", "六", "日"].map(function (value) {
                return "周" + value
            })
            $scope.weekList = []
            $scope.showDateList = []
            $scope.SHOW_MODE = {
                CALENDAR: 1,
                LIST: 2
            }
            $scope.showMode = $scope.SHOW_MODE.CALENDAR
            $scope.$watch("date", function (date) {
                var count = calendar.getCountOfMonth(date.month)
                $scope.showDateList = []
                for (var i = 1; i <= count; ++i) {
                    $scope.showDateList.push(new Date(date.year, date.month - 1, i))
                }
                var weekOrder = $scope.showDateList[0].getDay()
                for (var i = 1; i < weekOrder; ++i) {
                    $scope.showDateList.unshift(new Date(date.year, date.month - 1, 1 - i))
                }
                weekOrder = $scope.showDateList[$scope.showDateList.length - 1].getDay()
                for (var i = 1; i <= 7 - weekOrder; ++i) {
                    $scope.showDateList.push(new Date(date.year, date.month - 1, count + i))
                }
            }, true)
            $scope.$watch("showDateList", function () {
                $scope.weekList = []
                for (var i = 0; i < $scope.showDateList.length; ++i) {
                    if (i % 7 == 0) {
                        $scope.weekList.push([$scope.showDateList[i]])
                    } else {
                        $scope.weekList[$scope.weekList.length - 1].push($scope.showDateList[i])
                    }

                }
            })
        }])
})