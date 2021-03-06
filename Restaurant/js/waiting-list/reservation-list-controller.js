"use strict"

define(function (require) {
    var app = require("app")
    var ChineseDate = require("public/general/chinese-date")
    require("public/general/filter/width")
    app.controller('reservationListController', [
        "$scope", "$q", "reservationService", "dataService", function ($scope, $q, reservationService, dataService) {
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

            $scope.weekNameList = ["一", "二", "三", "四", "五", "六", "日"].map(function (value) {
                return "周" + value
            })
            $scope.weekList = []
            $scope.showDateList = []
            $scope.showReservationList = {}//key为日期的时间戳，值为getReservationSummary的返回值
            $scope.SHOW_MODE = {
                CALENDAR: 1,
                LIST: 2
            }
            $scope.showMode = $scope.SHOW_MODE.LIST
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
            function getReservationList() {
                var defer = $q.defer()
                if ($scope.reservationList) {
                    defer.resolve($scope.reservationList)
                } else {
                    $scope.$watch("reservationList", function (value) {
                        if (value) {
                            defer.resolve($scope.reservationList)
                        }
                    })
                }
                return defer.promise
            }

            $scope.accept = function (valid, reservation, acceptReason) {
                $scope.submitted = true
                if (valid) {
                    reservationService.accept({
                        restaurantId: reservation.restaurantId,
                        unitId: reservation.unitId,
                        comment: acceptReason
                    }).success(function (data) {
                        $scope.submitted = false
                        $scope.$broadcast("reservationStatusChange")
                        $scope.$broadcast("closePopover", "acceptPopover")
                        reservation.reservationStatus = dataService.reservationStatus.accept
                        reservation.reservationComment = acceptReason
                    })
                }
            }
            $scope.refuse = function (valid, reservation, refuseReason) {
                $scope.submitted = true
                if (valid) {
                    reservationService.refuse({
                        restaurantId: reservation.restaurantId,
                        unitId: reservation.unitId,
                        comment: refuseReason
                    }).success(function (data) {
                        $scope.submitted = false
                        $scope.$broadcast("reservationStatusChange")
                        $scope.$broadcast("closePopover", "refusePopover")
                        reservation.reservationStatus = dataService.reservationStatus.refuse
                        reservation.reservationComment = refuseReason
                    })
                }
            }
            $scope.getReservationSummary = function (date) {
                var DIRECT_SHOW_LENGTH = 6
                var replied = []
                var noReply = []
                var directShow = []
                var rest = []
                var all = []
                return getReservationList().then(function (reservationList) {
                    reservationList.forEach(function (reservation) {
                        if (date.isSameDay(new ChineseDate(reservation.reservationInfo.reservationTime * 1000))) {
                            if (reservation.reservationStatus === $scope.reservationStatusMap.waitConfirm) {
                                noReply.push(reservation)
                            } else {
                                replied.push(reservation)
                            }
                            directShow.push(reservation)
                        }
                    })
                    all = directShow
                    if (directShow.length > DIRECT_SHOW_LENGTH) {
                        rest = directShow.slice(DIRECT_SHOW_LENGTH - 1)
                        directShow = directShow.slice(0, DIRECT_SHOW_LENGTH - 1)
                    }
                    return {
                        replied: replied,
                        noReply: noReply,
                        directShow: directShow,
                        rest: rest,
                        all: all
                    }
                })
            }
            $scope.reservationListUrl = "partials/reservation-list.html"
            $scope.$watch("date", function (date) {
                var count = ChineseDate.getCountOfMonth(date.year, date.month)
                $scope.showDateList = []
                $scope.showReservationList = {}
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
                updateDateReservationList()
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
            $scope.$watchCollection("reservationList", function (value) {
                updateDateReservationList()
            })
            $scope.$on("reservationStatusChange", function () {
                updateDateReservationList()
            })
            /**
             * 更新日期关联的预约列表
             */
            function updateDateReservationList() {
                $scope.showDateList.forEach(function (showDate) {
                    $scope.getReservationSummary(showDate).then(function (reservationSummary) {
                        $scope.showReservationList[showDate.getTime()] = reservationSummary
                    })
                })
            }
        }
    ])
})