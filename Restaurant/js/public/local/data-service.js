"use strict"

define(function (require) {
    var app = require("app")
    var dataService = [function () {
        var result = {
            reservationStatus: {
                waitConfirm: 1,
                accept: 2,
                refuse: 3
            }
        }
        var API = {
            getText: function (value) {
                var result
                util.getArray(this).some(function (item) {
                    if (item.value === value) {
                        result = item.text
                        return true
                    }
                })
                return result
            }
        }
        angular.forEach(result, function (value) {
            value.__proto__ = API
        })
        return result
    }]
    app.service("dataService", dataService)
})