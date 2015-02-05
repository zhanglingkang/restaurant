"use strict"

define(function (require) {
    var app = require("app")
    var util = require("public/general/util")
    var pubSub = require("public/general/pub-sub")
    var system = require("public/local/system")
    var ChineseData = require("public/general/chinese-date")
    require("./reservation-list-controller")
    require("public/local/restaurant-service")
    require("./waiting-list-service")
    require("public/local/reservation-service")
    require("public/general/speech-service")
    require("public/general/directive/popover")
    app.controller('waitingListController', [
        '$modal', '$scope', '$routeParams', '$timeout', '$cookies', '$window',
        '$mdToast', 'restaurantService', 'waitingListService', "reservationService",
        "dataService", "$filter", "speechService",
        function ($modal, $scope, $routeParams, $timeout, $cookies, $window, $mdToast, restaurantService, waitingListService, reservationService, dataService, $filter, speechService) {
            $scope.restaurantId = $routeParams.restaurantId
            var UPDATE_INTERVAL = 10000
            var publicWindow = null
            $scope.goBack = function () {
                window.history.back()
            }
            $scope.reservationTypeMap = {
                reservationDesk: {
                    text: "预约留台",
                    value: "1"
                },
                reservationRoom: {
                    text: "预约房间",
                    value: "2"
                }
            }
            $scope.reservationTypeArray = util.getArray($scope.reservationTypeMap)

            restaurantService.getRestaurant($scope.restaurantId).then(function (restaurant) {
                $scope.partyTypeList = restaurant.partyTypeInfos
                $scope.restaurant = restaurant
                $scope.maxQueueLength = restaurant.restaurantSettings.maxQueueLength
                initReservationForm()
            }, function (error) {
                $scope.error = error
            })
            $scope.resetWaitingList = function () {
                restaurantService.resetWaitingList($scope.restaurantId).success(function () {
                    _updateData()
                })
            }
            $scope.setMaxQueue = function (valid) {
                if (valid) {
                    restaurantService.setMaxQueue($scope.restaurantId, $scope.maxQueueLength).success(function () {
                        $scope.restaurant.restaurantSettings.maxQueueLength = $scope.maxQueueLength
                        $scope.modifyMaxQueuePopover.close()
                    })
                }
            }
            $scope.stopReservation = function () {
                restaurantService.acceptReservation($scope.restaurantId, false).success(function () {
                    $scope.restaurant.restaurantSettings.acceptReservation = false
                })
            }
            $scope.startReservation = function () {
                restaurantService.acceptReservation($scope.restaurantId, true).success(function () {
                    $scope.restaurant.restaurantSettings.acceptReservation = true
                })
            }
            $scope.stopQueue = function () {
                restaurantService.enableQueue($scope.restaurantId, false).success(function () {
                    $scope.restaurant.restaurantSettings.enableQueue = false
                })
            }
            $scope.startQueue = function () {
                restaurantService.enableQueue($scope.restaurantId, true).success(function () {
                    $scope.restaurant.restaurantSettings.enableQueue = true
                })
            }
            function updateReservationList(reservationList) {
                reservationList = reservationList || $scope.reservationList
                $scope.reservationList = $filter("orderBy")(reservationList, 'reservationInfo.reservationTime')
            }

            $scope.waitingList = []
            var _updateData = function () {
                restaurantService.getWaitingList($scope.restaurantId, function (error, allList) {
                    $scope.error = error
                    $scope.waitingList = allList.waitingList
                    updateReservationList(allList.reservationList)
                    $scope.reservationCompleteList = allList.completeList.filter(function (value) {
                        return !!value.reservationInfo
                    })
                    $scope.waitingCompleteList = allList.completeList.filter(function (value) {
                        return !value.reservationInfo
                    })
                })
            }
            _updateData()
            $scope.$on("$destroy", function () {
                pubSub.unSubscribe("newReservation", _updateData)
            })
            pubSub.subscribe("newReservation", _updateData)
            $scope.call = function (unit, unitIdPrefix) {
                var msg = speechService.createMsg()
                unitIdPrefix = unitIdPrefix || "预"
                msg.text = unitIdPrefix + "," + unit.unitId.substring(unitIdPrefix.length)
                speechService.speak(msg)
                waitingListService.callUser($scope.restaurantId, unit.unitId).success(function (data) {
                    unit.callCount = data.results[0].callCount
                    pubSub.publish("businessSuccess", {
                        msg: "已发送"
                    })
                }).error(function (error) {
                })
                if (publicWindow) {
                    publicWindow.postMessage({
                        type: "call",
                        data: {
                            unitIdPrefix: unitIdPrefix,
                            unit: unit
                        }
                    }, window.location.href)
                }

            }
            $scope.openPublicWaitListWindow = function () {
                var feature = "left=0,top=0,width=" + screen.width + ",height=" + screen.height
                publicWindow = $window.open('#/publicWaitList/' + $scope.restaurantId, "publicWindow", feature)
                publicWindow.focus()
                var data = publicWindow.data = {
                    partyTypes: $scope.partyTypeList,
                    lastCalledNumbers: {

                    }
                }
                for (var i = 0; i < data.partyTypes.length; i++) {
                    var party = data.partyTypes[i]
                    var unit = null
                    if ($scope.waitingList[i + 1].length > 0) {
                        unit = $scope.waitingList[i + 1][0]
                    }
                    data.lastCalledNumbers[party.unitIdPrefix] = unit
                }
                publicWindow.postMessage({
                    type: "initData",
                    data: data
                }, window.location.href)
            }
            $scope.removeReservation = function (unitId) {
                waitingListService.removeReservation($scope.restaurantId, unitId).success(function () {
                    $scope.reservationList = $scope.reservationList.filter(function (item) {
                        return item.unitId !== unitId
                    })
                    _updateData()
                })
            }
            $scope.removeWaiting = function (unitId, key) {
                waitingListService.removeWaiting($scope.restaurantId, unitId).success(function () {
                    $scope.waitingList[key] = $scope.waitingList[key].filter(function (item) {
                        return item.unitId !== unitId
                    })
                    _updateData()
                })
            }
            function initWaitForm() {
                $scope.waitForm = {
                    name: "",
                    "phone.number": "",
                    partyTypeId: "",
                    restaurantId: $scope.restaurantId,
                    queueType: dataService.queueType.wait
                }
            }

            initWaitForm()
            $scope.addWaitUser = function (valid, partyTypeId) {
                if (valid) {
                    $scope.waitForm.partyTypeId = partyTypeId
                    var printWindow = $scope.openTempPrintView("printWindow")
                    var promise = waitingListService.addWaitUser($scope.waitForm).success(function (data) {
                        var unit = data.results[0]
                        $scope.waitingList[partyTypeId].push(unit)
                        initWaitForm()
                        printWindow.printData = getPrintData(data.results[0], getPartyType(partyTypeId))
                        printWindow.requestPrint && printWindow.requestPrint()
                        $scope.waitFormValidation.$setPristine()
                    })
                }
            }
            function initReservationForm() {
                $scope.reservationForm = {
                    restaurantId: $scope.restaurantId,
                    name: "",
                    "phone.number": "",
                    partyTypeId: $scope.partyTypeList[0].partyTypeId,
                    reservationTime: new Date(),
                    reservationType: $scope.reservationTypeMap.reservationDesk.value,
                    reservableId: $scope.restaurant.reservableRooms[0] ? $scope.restaurant.reservableRooms[0].reservableId : "",
                    headCount: ""
                }
            }

            $scope.addReservationUser = function () {
                var reservationForm = angular.copy($scope.reservationForm)
                if (reservationForm.reservationType === $scope.reservationTypeMap.reservationRoom.value) {
                    reservationForm.partyTypeId = 0
                    reservationForm.queueType = dataService.queueType.reserveRoom
                } else {
                    reservationForm.queueType = dataService.queueType.reserveParty
                    delete reservationForm.reservableId
                }
                delete reservationForm.reservationType
                waitingListService.addReservationUser(reservationForm).success(function (data) {
                    $scope.reservationList.push(data.results[0])
                    initReservationForm()
                    $scope.reservationFormValidation.$setPristine()
                    updateReservationList()
                })
            }
            $scope.openConfirmation = function (units, idx, type) {
                var modal = $modal.open({
                    templateUrl: 'confirmationModal.html',
                    size: 'sm',
                    controller: "confirmationModalController",
                    resolve: {
                        queueUnit: function () {
                            return units[idx]
                        }
                    }
                })
                modal.result.then(function () {
                    $scope.remove(units, idx, type)
                }, function () {

                })
            }
            function getPartyTypeDescription(partyTypeId) {
                return getPartyType(partyTypeId).partyTypeDescription
            }

            function getPartyType(partyTypeId) {
                var result
                $scope.partyTypeList.some(function (partyType) {
                    if (partyType.partyTypeId === partyTypeId) {
                        result = partyType
                        return true
                    }
                })
                return result
            }

            $scope.openTempPrintView = function (windowName) {
                return  $window.open(system.getTplAbsolutePath("printNumber.html"), windowName, "left=0,top=0")
            }
            /**
             *
             * @param unit
             * @param partyType
             * @param windowName 打印窗口的名字，默认为空
             * @returns {*}
             */
            $scope.openPrintView = function (unit, partyType, windowName) {
                windowName = windowName || ""
                var printWindow = $window.open(system.getTplAbsolutePath("printNumber.html"), windowName, "left=0,top=0")
                printWindow.printData = getPrintData(unit, partyType)
            }
            function getPrintData(unit, partyType) {
                var printPartyTypeDescription
                if (partyType) {
                    printPartyTypeDescription = partyType.partyTypeDescription
                } else {
                    printPartyTypeDescription = getPartyTypeDescription(unit.partyTypeId)
                    $scope.reservationList.some(function (reservation, index) {
                        if (reservation.unitId === unit.unitId) {
                            unit.position = index
                            return true
                        }
                    })
                }
                return  {
                    unit: unit,
                    partyTypeDescription: printPartyTypeDescription,
                    printTime: new ChineseData
                }
            }

            $scope.reservationStatusMap = dataService.reservationStatus
            // _nextUpdate()
        }
    ])
})