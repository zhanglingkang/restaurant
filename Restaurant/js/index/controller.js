"use strict";

define(function (require) {
    var app = require("app")
    var util = require("public/general/util")
    var pubSub = require("public/general/pub-sub")
    require("public/local/reservation-service")
    require("public/general/audio-service")
    require("public/general/notification-service")
    require("public/local/notification-service")
    require("./directive")
    app.controller('appController', [
        "$rootScope", "$scope", '$cookies', "$location" , "$mdBottomSheet",
        "$mdToast", "reservationService", "audioService", "dataService", "notificationService",
        function ($rootScope, $scope, $cookies, $location, $mdBottomSheet, $mdToast, reservationService, audioService, dataService, notificationService) {
            /**
             * 任何一个请求都有四种状态：INIT 尚未请求 REQUESTING 请求中 REQUEST_SUCCESSED 请求成功 REQUEST_FAILED 请求失败
             */
            $rootScope.REQUEST_STATUS = {
                INIT: 0,
                REQUESTING: 1,
                REQUEST_SUCCESSED: 2,
                REQUEST_FAILED: 3
            };
            $rootScope.KEY_CODE = {
                ENTER: 13,
                BACKSPACE: 8,
                TOP: 38,
                RIGHT: 39,
                BOTTOM: 40,
                LEFT: 37
            };
            $rootScope.showCover = false;
            $rootScope.alertType = "alert-info";
            $rootScope.alertContent = "";
            /**
             *
             * @param {Object} config
             * @param {String} config.alertType
             * @param {String} config.alertContent
             * @param {Boolean} config.showCover
             */
            $rootScope.setAlert = function (config) {
                $rootScope.showCover = config.showCover || false;
                $rootScope.alertType = config.alertType || "alert-info";
                $rootScope.alertContent = config.alertContent || "";
            };

            pubSub.subscribe("businessError", tip);
            pubSub.subscribe("serverError", tip);
            pubSub.subscribe("businessSuccess", tip);
            /**
             * 判断当前用户是否已登录
             */
            $scope.isLogined = function () {
                return !!($cookies.token && $cookies.token !== "null");
            };
            $scope.$on("$locationChangeStart", function (event, newUrl, oldUrl) {
                if (!isLogined() && !/login/.test(newUrl)) {
                    $location.path("/login");
                }
            });
            $scope.showReservationList = function () {
                var $mdBottomSheetPromise = $mdBottomSheet.show({
                    templateUrl: 'partials/reservationToastList.html',
                    controller: 'reservationCtrl',
                    locals: {
                        queueMap: reservationService.getQueueMap()
                    }
                });
            };
            function getReservationMap(queueMap) {
                var reservationMap = {};
                angular.forEach(queueMap, function (queue, restaurantId) {
                    reservationMap[restaurantId] = queue.reservationList;
                });
                return reservationMap;
            }

            function getWaitConfirmReservationNum(queueMap) {
                var reservationMap = getReservationMap(queueMap);
                var sum = 0;
                angular.forEach(reservationMap, function (reservationList, restaurantId) {
                    reservationList.forEach(function (reservation) {
                        sum += reservation.reservationStatus === dataService.reservationStatus.waitConfirm ? 1 : 0;
                    })
                });
                return sum;
            }

            var audio;
            $rootScope.$watch("disableReservationHint", function (value) {
                if (value) {
                    reservationService.close();
                    pubSub.unSubscribe("newReservation", handleNewReservation);
                }
            })

            function tip(data) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(data.msg)
                        .position("right bottom")
//                        .hideDelay(0)
                );
            }

            function handleNewReservation(queueMap) {
                var waitConfirmReservationNum = getWaitConfirmReservationNum(queueMap);
                if (waitConfirmReservationNum > 0) {
                    notificationService.create('预约消息', {
                        body: '一共收到' + waitConfirmReservationNum + '条预约消息',
                        icon: 'img/ppz.jpg',
                        tag: "tip"
                    }).then(function (notification) {
                        notification.onclick = function () {
                            notification.close();
                            console.log("notification");
                            top.window.focus();
                        }
                    });
                    if (!audio) {
                        audio = audioService.create({
                            src: "img/tip.ogg"
                        })
                    }
                    audio.play();
                }
            }

            if (!$rootScope.disableReservationHint) {
                pubSub.subscribe("newReservation", handleNewReservation);
                if (isLogined()) {
                    reservationService.connect();
                }
            }

        }]);

});
