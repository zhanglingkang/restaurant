"use strict"

define(function (require) {
    var app = require("app")
    var util = require("public/general/util")
    var pubSub = require("public/local/pub-sub")
    require("public/local/restaurant-service")
    require("./waiting-list-service")
    require("public/local/reservation-service")
    require("public/general/speech-service")
    app.controller('waitingListController', [
        '$modal', '$scope', '$routeParams', '$timeout', '$cookies', '$window',
        '$mdToast', 'restaurantService', 'waitingListService', "reservationService",
        "dataService", "$filter", "speechService",
        function ($modal, $scope, $routeParams, $timeout, $cookies, $window, $mdToast, restaurantService, waitingListService, reservationService, dataService, $filter, speechService) {
            $scope.restaurantId = $routeParams.restaurantId;
            var UPDATE_INTERVAL = 10000;
            var publicWindow = null;
            $scope.goBack = function () {
                window.history.back();
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
            $scope.newReserve = {
                time: new Date(),
                typeId: "",
                reservableId: "",
                number: "",
                reservationType: $scope.reservationTypeMap.reservationDesk.value
            };
            restaurantService.getRestaurant($scope.restaurantId).then(function (restaurant) {
                $scope.partyTypeList = restaurant.partyTypeInfos;
                $scope.newReserve.typeId = $scope.partyTypeList[0].partyTypeId;
                $scope.restaurant = restaurant;
                $scope.newReserve.reservableId = $scope.restaurant.reservableRooms[0] ? $scope.restaurant.reservableRooms[0].reservableId : ""
                $scope.maxQueueLength = restaurant.restaurantSettings.maxQueueLength;
            }, function (error) {
                $scope.error = error;
            });
            $scope.resetWaitingList = function () {
                restaurantService.resetWaitingList($scope.restaurantId).success(function () {
                    _updateData();
                });
            };
            $scope.setMaxQueue = function (valid) {
                if (valid) {
                    restaurantService.setMaxQueue($scope.restaurantId, $scope.maxQueueLength).success(function () {
                        $scope.restaurant.restaurantSettings.maxQueueLength = $scope.maxQueueLength;
                        $scope.modifyMaxQueuePopover.close();
                    });
                }
            };
            $scope.stopReservation = function () {
                restaurantService.acceptReservation($scope.restaurantId, false).success(function () {
                    $scope.restaurant.restaurantSettings.acceptReservation = false;
                });
            };
            $scope.startReservation = function () {
                restaurantService.acceptReservation($scope.restaurantId, true).success(function () {
                    $scope.restaurant.restaurantSettings.acceptReservation = true;
                });
            };
            $scope.stopQueue = function () {
                restaurantService.enableQueue($scope.restaurantId, false).success(function () {
                    $scope.restaurant.restaurantSettings.enableQueue = false;
                });
            };
            $scope.startQueue = function () {
                restaurantService.enableQueue($scope.restaurantId, true).success(function () {
                    $scope.restaurant.restaurantSettings.enableQueue = true;
                });
            };
            $scope.waitingList = [];
            Date.prototype.toString = function () {
                return $filter("date")(this, "yyyy-MM-dd");
            };

            var _updateData = function () {
                restaurantService.getWaitingList($scope.restaurantId, function (error, allList) {
                    $scope.error = error;
                    $scope.waitingList = allList.waitingList;
                    $scope.reservationList = allList.reservationList;
                    $scope.reservationCompleteList = allList.completeList.filter(function (value) {
                        return !!value.reservationInfo;
                    });
                    $scope.waitingCompleteList = allList.completeList.filter(function (value) {
                        return !value.reservationInfo;
                    });
                });
            };
            _updateData();
            $scope.$on("$destroy", function () {
                pubSub.unSubscribe("newReservation", _updateData);
            });
            pubSub.subscribe("newReservation", _updateData);
            $scope.call = function (unit, unitIdPrefix) {
                var msg = speechService.createMsg();
                msg.text = "现在叫号," + unit.unitId;
                speechService.speak(msg);
                waitingListService.callUser($scope.restaurantId, unit.unitId).success(function (data) {
                    unit.callCount = data.results[0].callCount;
                    pubSub.publish("businessSuccess", {
                        msg: "已发送"
                    });
                }).error(function (error) {
                });
                if (publicWindow) {
                    publicWindow.postMessage({
                        type: "call",
                        data: {
                            unitIdPrefix: unitIdPrefix,
                            unit: unit
                        }
                    }, window.location.href);
                }

            };
            $scope.openPublicWaitListWindow = function () {
                var feature = "left=0,top=0,width=" + screen.width + ",height=" + screen.height;
                publicWindow = $window.open('#/publicWaitList/' + $scope.restaurantId, "publicWindow", feature);
                publicWindow.focus();
                var data = publicWindow.data = {
                    partyTypes: $scope.partyTypeList,
                    lastCalledNumbers: {

                    }
                };
                for (var i = 0; i < data.partyTypes.length; i++) {
                    var party = data.partyTypes[i];
                    var frontUnit = "--";
                    if ($scope.waitingList[i + 1].length > 0) {
                        frontUnit = $scope.waitingList[i + 1][0].unitId;
                    }
                    data.lastCalledNumbers[party.unitIdPrefix] = frontUnit;
                }
                publicWindow.postMessage({
                    type: "initData",
                    data: data
                }, window.location.href);
            };
            $scope.removeReservation = function (unitId) {
                waitingListService.removeReservation($scope.restaurantId, unitId).success(function () {
                    $scope.reservationList = $scope.reservationList.filter(function (item) {
                        return item.unitId !== unitId;
                    });
                    _updateData();
                });
            };
            $scope.removeWaiting = function (unitId, key) {
                waitingListService.removeWaiting($scope.restaurantId, unitId).success(function () {
                    $scope.waitingList[key] = $scope.waitingList[key].filter(function (item) {
                        return item.unitId !== unitId;
                    });
                    _updateData();
                });
            }
            $scope.addUser = function (reserve) {
                var reserveTime = reserve ? $scope.newReserve.time : null;
                var typeId = $scope.newReserve.typeId;
                var promise;
                if ($scope.newReserve.reservationType === $scope.reservationTypeMap.reservationRoom.value) {
                    typeId = 0
                    promise = waitingListService.reserveRoom(
                        $scope.restaurantId, $scope.newReserve.name, typeId, $scope.newReserve.phone, reserveTime, $scope.newReserve.reservableId, $scope.newReserve.number
                    )
                } else {
                    promise = waitingListService.addUser(
                        $scope.restaurantId, $scope.newReserve.name, $scope.newReserve.typeId, $scope.newReserve.phone, reserveTime
                    )
                }

                promise.success(function (data) {
                    var newUnit = data.results[0];
                    if (reserve) {
                        $scope.reservationList.push(newUnit);
                    }
                    else {
                        //update public window if new unit is inserted into an empty list
                        if ($scope.waitingList[typeId].length == 0 && publicWindow) {
                            publicWindow.lastReplacedUnit = newUnit;
                            publicWindow.lastReplacedUnitPrefix = newUnit.unitId.charAt(0);
                        }

                        $scope.waitingList[typeId].push(newUnit);
                    }

                    $scope.newReserve = {
                        time: new Date(),
                        typeId: $scope.newReserve.typeId,
                        reservableId: $scope.restaurant.reservableRooms[0] ? $scope.restaurant.reservableRooms[0].reservableId : "",
                        number: "",
                        reservationType: $scope.reservationTypeMap.reservationDesk.value
                    };
                    $scope.reserveForm.$setPristine();
                })
            };
            $scope.reserveRoom = function () {
                var reserveTime = reserve ? $scope.newReserve.time : null;
            }

            $scope.openConfirmation = function (units, idx, type) {
                var modal = $modal.open({
                    templateUrl: 'confirmationModal.html',
                    size: 'sm',
                    controller: "confirmationModalController",
                    resolve: {
                        queueUnit: function () {
                            return units[idx];
                        }
                    }
                });

                modal.result.then(function () {
                    $scope.remove(units, idx, type);
                }, function () {

                });
            };

            $scope.openPrintView = function (unit, partyType) {
                var printWindow = $window.open('#/printNumber/' + unit.unitId);
                if (partyType) {
                    printWindow.printPartyTypeDescription = partyType.partyTypeDescription;
                } else {
                    var prefix = unit.unitId.charAt(0);
                    for (var i = 0; i < $scope.partyTypeList.length; i++) {
                        var partyType = $scope.partyTypeList[i];
                        if (prefix == partyType.unitIdPrefix) {
                            printWindow.printPartyTypeDescription = "(预约)" + partyType.partyTypeDescription;
                            break;
                        }
                    }
                }
                printWindow.printUnitId = unit.unitId;
            };
            $scope.reservationStatusMap = dataService.reservationStatus;
            $scope.accept = function (valid, reservation, acceptReason) {
                $scope.submitted = true;
                if (valid) {
                    reservationService.accept({
                        restaurantId: reservation.restaurantId,
                        unitId: reservation.unitId,
                        comment: acceptReason
                    }).success(function (data) {
                        $scope.submitted = false;
                        $scope.$broadcast("closePopover", "acceptPopover");
                        reservation.reservationStatus = dataService.reservationStatus.accept;
                        reservation.reservationComment = acceptReason;
                    });
                }
            };

            $scope.refuse = function (valid, reservation, refuseReason) {
                $scope.submitted = true;
                if (valid) {
                    reservationService.refuse({
                        restaurantId: reservation.restaurantId,
                        unitId: reservation.unitId,
                        comment: refuseReason
                    }).success(function (data) {
                        $scope.submitted = false;
                        $scope.$broadcast("closePopover", "refusePopover");
                        reservation.reservationStatus = dataService.reservationStatus.refuse;
                        reservation.reservationComment = refuseReason;
                    });
                }
            };
            $scope.reservationStatusMap = dataService.reservationStatus;
            // _nextUpdate();
        }
    ])
})