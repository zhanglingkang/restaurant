"use strict"

define(function (require) {
    var app = require("app")
    app.factory('waitingListService', [
        '$window', '$cookies', "httpService", function ($window, $cookies, httpService) {
            return {
                lastCalledNumber: 0,
                callUser: function (restaurantId, unitId) {
                    this.lastCalledNumber = unitId
                    return httpService.post({
                        command: "callUser",
                        data: {
                            restaurantId: restaurantId,
                            unitId: unitId
                        }
                    })
                },
                removeReservation: function (restaurantId, unitId) {
                    return httpService.post({
                        command: "reservationToComplete",
                        data: {
                            restaurantId: restaurantId,
                            unitId: unitId
                        }
                    })

                },
                removeWaiting: function (restaurantId, unitId) {
                    return httpService.post({
                        command: "waitingToComplete",
                        data: {
                            restaurantId: restaurantId,
                            unitId: unitId
                        }
                    })
                },
                addUser: function (form) {
                    return httpService.post({
                        command: "addAdhocUserToQueue",
                        data: form
                    })
                },
                /**
                 *
                 * @param waitForm
                 */
                addWaitUser: function (waitForm) {
                    return this.addUser(waitForm)
                },
                /**
                 * @param {Object} reservationForm
                 * @param {string} reservationForm.restaurantId
                 * @param {string} reservationForm.name 用户名
                 * @param {string} reservationForm.partyTypeId 餐位Id 如果预约类型为房间,partyTypeId为0
                 * @param {string} reservationForm['phone.number']
                 * @param {Date} reservationForm.reservationTime
                 * @param {string} reservationForm.queueType 值为3
                 * @param {number} reservationForm.number 预约人数
                 * @returns {*}
                 */
                addReservationUser: function (reservationForm) {
                    if (reservationForm.reservationTime instanceof Date) {
                        reservationForm.reservationTime = Math.round(reservationForm.reservationTime.getTime() / 1000)
                    }
                    reservationForm.partyTypeId = parseInt(reservationForm.partyTypeId)
                    return this.addUser(reservationForm)
                }
            }
        }])
})