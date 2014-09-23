var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;

angular.module("ppzDirectives", []).directive('menuManager', function () {
    return {
        restrict: 'E',
        scope: {},
        controller: function ($scope) {
        },
        templateUrl: 'partials/menu.html'
    }
}).directive('smartFloat', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (FLOAT_REGEXP.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace(',', '.'));
                } else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                }
            });
        }
    };
}).directive("fileModel", function () {
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
    };
});