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
                addUser: function (restaurantId, name, partyTypeId, phone, reservationTime) {
                    if (reservationTime !== null) {
                        reservationTime = Math.round(reservationTime.getTime() / 1000)
                    }
                    return httpService.post({
                        command: "addAdhocUserToQueue",
                        data: {
                            restaurantId: restaurantId,
                            name: name,
                            partyTypeId: parseInt(partyTypeId),
                            "phone.number": phone,
                            reservationTime: reservationTime

                        }
                    })
                },
                reserveRoom: function (restaurantId, name, partyTypeId, phone, reservationTime, reservableId, number) {
                    if (reservationTime !== null) {
                        reservationTime = Math.round(reservationTime.getTime() / 1000)
                    }
                    return httpService.post({
                        command: "addAdhocUserToQueue",
                        data: {
                            restaurantId: restaurantId,
                            name: name,
                            partyTypeId: parseInt(partyTypeId),
                            "phone.number": phone,
                            reservationTime: reservationTime,
                            queueType: 3,
                            number: number

                        }
                    })
                }
            }
        }])
})