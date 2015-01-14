"use strict"

define(function (require) {
    var app = require("app")
    var ChineseDate = require("public/general/chinese-date")
    app.controller('reservationListController', [
        "$scope", function ($scope) {
            var startYear = 2015
            var endYear = new ChineseDate().getFullYear() + 1
            $scope.yearList = []
            for (var i = startYear; i <= endYear; i++) {
                $scope.yearList.push(i)
            }
            $scope.monthList = []
            for (var i = 1; i <= 12; i++) {
                $scope.monthList.push(i)
            }
            $scope.date = {
                set year(value) {
                    this._year = parseInt(value)
                },
                get year() {
                    return this._year
                },
                set month(value) {
                    this._month = parseInt(value)
                },
                get month() {
                    return this._month
                }
            }
            $scope.date.year = new ChineseDate().getFullYear()
            $scope.date.month = new ChineseDate().getMonth() + 1
            console.log($scope.date)
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
            $scope.last = function () {
                if ($scope.date.month > 1) {
                    $scope.date.month -= 1
                } else {
                    if ($scope.date.year > $scope.yearList[0]) {
                        $scope.date.year -= 1
                        $scope.date.month = 12
                    } else {

                    }
                }
            }
            $scope.next = function () {
                if ($scope.date.month < 12) {
                    $scope.date.month += 1
                } else {
                    if ($scope.date.year < $scope.yearList[$scope.yearList.length - 1]) {
                        $scope.date.year += 1
                        $scope.date.month = 1
                    } else {

                    }
                }
            }
            $scope.toToday = function () {
                $scope.date.year = new Date().getFullYear()
                $scope.date.month = new Date().getMonth() + 1
            }
            $scope.getReservationSummary = function () {
                return {
                    total: "",
                    replied: "",
                    noReply: ""
                }
            }
            $scope.reservationListUrl = "partials/reservation-list.html"
            $scope.$watch("date", function (date) {
                var count = ChineseDate.getCountOfMonth(date.year, date.month)
                $scope.showDateList = []
                for (var i = 1; i <= count; ++i) {
                    $scope.showDateList.push(new ChineseDate(date.year, date.month - 1, i))
                }
                var weekOrder = $scope.showDateList[0].getDay() || 7
                for (var i = 1; i < weekOrder; ++i) {
                    $scope.showDateList.unshift(new ChineseDate(date.year, date.month - 1, 1 - i))
                }
                weekOrder = $scope.showDateList[$scope.showDateList.length - 1].getDay() || 7
                for (var i = 1; i <= 7 - weekOrder; ++i) {
                    $scope.showDateList.push(new ChineseDate(date.year, date.month - 1, count + i))
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