"use strict"

define(function (require) {
    var app = require("app")
    var util = require("public/general/util")
    var pubSub = require("public/general/pub-sub")
    var reservationService = ["httpService", "$cookies", "$mdBottomSheet", function (httpService, $cookies, $mdBottomSheet) {
        var eventSource;
        /**
         * key为restaurantId,
         * value为{waitingList:[],completeList:[],reservationList:[]}
         * @type {{}}
         */
        var queueMap = {

        };
        queueMap.__proto__ = {
            /**
             *
             * @param restaurantId
             * @param {Object} queue
             */
            addQueue: function (restaurantId, queue) {
                if (!queueMap[restaurantId]) {
                    queueMap[restaurantId] = queue;
                    return;
                }
                concat(queueMap[restaurantId].reservationList, queue.reservationList);
                angular.forEach(queueMap[restaurantId].waitingList, function (value, key) {
                    concat(queueMap[restaurantId].waitingList[key], queue.waitingList[key]);
                });
                concat(queueMap[restaurantId].completeList, queue.completeList);
                /**
                 * 将secondList concat至firstList,此函数会改变firstList的内容
                 * @param {Array} firstList
                 * @param {Array} secondList
                 */
                function concat(firstList, secondList) {
                    secondList.forEach(function (newItem) {
                        if (!contain(firstList, newItem)) {
                            firstList.push(newItem);
                        } else {
                            firstList.forEach(function (oldItem, index) {
                                    if (equal(newItem, oldItem)) {
                                        firstList[index] = newItem;
                                    }
                                }
                            )
                        }
                    });
                }
            }
        };
        /**
         * 某个预约列表是否有某条预约信息
         * @param {Array} unitList
         * @param {Object} unit
         */
        function contain(unitList, unit) {
            var map = {};
            unitList.forEach(function (item) {
                map[item.createTime] = item;
            });
            return !!map[unit.createTime];
        }

        /**
         * 比较两条预约信息是否为同一条
         * @param {Object} reservation1
         * @param {Object} reservation2
         * @return {boolean}如果是，返回true
         */
        function equal(unit1, unit2) {
            return unit1.createTime === unit2.createTime;
        }

        return {
//                /**
//                 * 接受餐厅列表中包含的餐厅的推送消息
//                 * @param {Array} restaurantList
//                 */
//                receiveReservationInfo: function (self, restaurantList) {
//                    restaurantList.forEach(function (restaurant) {
//                        self.connect();
//                    });
//                }.curryThis(),
            /**
             * 与服务器建立一条EventSource连接，如果连接已经建立，不重复建立,同一个餐厅id可以多次调用没有副作用
             */
            connect: function () {
                if (!eventSource || eventSource.readyState === EventSource.CLOSED) {
                    eventSource = new EventSource(util.getUrl("/bbqueue", {
                        command: "pullQueueUnit",
                        sessionId: $cookies.token
                    }));
                    eventSource.addEventListener("open", function (event) {
                        console.log("open:" + new Date());
                    });
                    eventSource.addEventListener("error", function (event) {
                        console.log("error:" + new Date());
                    });
                    eventSource.addEventListener("message", function (event) {
                        var data = JSON.parse(event.data);
                        queueMap.addQueue(data.restaurantId, data.queues);
                        pubSub.publish("newReservation", queueMap);
                        console.log("message:");
                    });
                }
            },
            close: function () {
                if (eventSource) {
                    eventSource.close();
                }
            },
            getQueueMap: function () {
                return queueMap;
            },
            getQueue: function (restaurantId) {
                return queueMap[restaurantId];
            },
            /**
             *
             * @param {Object} reservationForm
             * @param reservationForm.restaurantId
             * @param reservationForm.unitId,
             * @param reservationForm.comment
             */
            accept: function (reservationForm) {
                return this.acceptOrDeclineReservation(angular.extend({
                    accept: true
                }, reservationForm));
            },
            refuse: function (reservationForm) {
                return this.acceptOrDeclineReservation(angular.extend({
                    accept: false
                }, reservationForm));
            },
            acceptOrDeclineReservation: function (data) {
                return httpService.post({
                    command: "acceptOrDeclineReservation",
                    data: data
                });
            }
        }
    }
    ]
    app.service("reservationService", reservationService)
})