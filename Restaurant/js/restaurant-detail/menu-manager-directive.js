"use strict"

define(function (require, exports, module) {
    var app = require("app")
    app.directive('menuManager', function () {
        return {
            restrict: 'E',
            scope: {},
            controller: function ($scope) {
            },
            templateUrl: 'partials/menu.html'
        }
    })

})
