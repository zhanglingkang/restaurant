"use strict";

define(function (require, exports, module) {
    var app = require("app");
    var util = require("public/general/util");
    app.directive("ngModel", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                var $elem = $(elem);
                if ($elem[0].nodeName === "INPUT" && $elem.attr("type") === "file") {
                    $elem.bind("change", function () {
                        scope.$apply(function () {
                            var value = $elem[0].multiple ? $elem[0].files : $elem[0].files[0];
                            util.setPropertyValue(scope, attrs.ngModel, value);
                        });
                    });
                }
            }
        };
    });
});