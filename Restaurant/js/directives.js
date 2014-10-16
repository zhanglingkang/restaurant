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
}).directive("confirmHint", function () {
    var $modal = $("#modal-hint");
    $modal.modal({
        keyboard: false,
        show: false,
        backdrop: false
    });
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            var $elem = $(elem);
            var confirmed = false;
            document.addEventListener("click", function (event) {
                if ($elem[0] === event.target) {
                    if (!confirmed) {
                        event.stopPropagation();
                        $modal.find(".modal-title").html(attrs.modalTitle);
                        $modal.find(".modal-body").html(attrs.modalContent);
                        $modal.modal('show');
                        $modal.find(".confirm")[0].onclick = function () {
                            confirmed = true;
                            $modal.modal('hide');
                            event.target.click();
                        };
                    } else {
                        confirmed = false;
                    }
                }
            }, true);
        }
    };
}).directive("preventSpread", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            var $elem = $(elem);
            $elem.bind(attrs.preventSpread, function (event) {
                event.stopPropagation();
            });
        }
    };
}).directive("viewImg", function () {
    var $modal = $("#modal-view-img");
    $modal.modal({
        show: false
    });
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            var $elem = $(elem);
            $elem.bind("click", function () {
                if ($elem.attr("src")) {
                    $modal.find(".modal-title").html(attrs.imgTitle);
                    $modal.find(".modal-body img").attr("src", $elem.attr("src"));
                    $modal.modal('show');
                }
            });

        }
    };
});