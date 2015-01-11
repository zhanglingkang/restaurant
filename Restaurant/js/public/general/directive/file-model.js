"use strict"

define(function (require, exports, module) {
    var app = require("app")
    app.directive("fileModel", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                var $elem = $(elem);
                $elem.bind("change", function () {
                    scope.$apply(function () {
                        scope[attrs.fileModel] = $elem[0].files;
                    });

                });
            }
        }
    })

})