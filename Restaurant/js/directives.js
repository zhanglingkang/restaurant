
;(function () {
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
    }).directive("dragId", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                $(elem).attr("draggable", "true");
            }
        }
    }).directive("dragSort", function () {
        return {
            restrict: "A",
            scope: {
                dragCompleted: "="
            },
            link: function (scope, elem, attrs) {
                var $elem = $(elem);
                //在一次拖拽过程中，除了被拖拽元素之外的其他元素的先后顺序是不会变化的。所以判断此次拖拽是否发生了元素重排只需要判断被拖拽元素的位置是否改变
                var dragNode;//被拖拽的节点，每次拖拽结束置为空
                var originalPosition = -1;//
                var selector = ">[" + attrs.dragSort + "]";
                $elem.delegate(selector, "dragstart", function (event) {
                    var rawEvent = event.originalEvent;
                    dragNode = event.currentTarget;
                    originalPosition = getPosition(dragNode);
                    $(dragNode).addClass("moving");
                    //不知道是不是firefox的bug,非得调用setData方法才有拖拽效果。才能触发dragenter,dragend等后续拖拽事件。
                    rawEvent.dataTransfer.setData("text", "");
                    //rawEvent.dataTransfer.setDragImage(rawEvent.target, 0, 0);
                    rawEvent.dataTransfer.effectAllowed = "move";
                });
                $elem.delegate(selector, "dragover", function (event) {
                    var goalNode;
                    //如果被拖拽的节点是$elem的子元素，执行下面的逻辑
                    if (dragNode) {
                        goalNode = event.currentTarget;
                        if (goalNode === dragNode) {
                            return;
                        }
                        var where = dragNode.compareDocumentPosition(goalNode) === 2 ? "before" : "after";
                        $(goalNode)[where](dragNode);
                    }
                });
                $elem.delegate(selector, "dragend", function (event) {
                    var sortList = [];
                    $(dragNode).removeClass("moving");
                    //如果发生了顺序重排或者强制认为只要拖拽即发生顺序重排
                    if ((dragNode && originalPosition !== getPosition(dragNode)) || "forceRefresh" in attrs) {
                        $elem.children().attr("data-remove", "");
                        $elem.find(selector).each(function (index, value) {
                            sortList.push({
                                id: value.getAttribute(attrs.dragSort),
                                sort: index + 1
                            })
                        });
                        scope.$apply(function () {
                            scope.dragCompleted({
                                sortList: sortList,
                                dragParam: attrs.dragParam,
                                dragNodeId: dragNode.getAttribute(attrs.dragSort)
                            });
                        });
                    }
                    dragNode = null;
                    originalPosition = -1;
                });
                /**
                 * 得到dragNode节点的位置.从1开始计数
                 * @param dragNode
                 * @returns {*}
                 */
                function getPosition(dragNode) {
                    var position;
                    $elem.find(selector).each(function (index, value) {
                        if (value.getAttribute(attrs.dragSort) === dragNode.getAttribute(attrs.dragSort)) {
                            position = index + 1;
                        }
                    });
                    return position;
                }
            }
        };
    }).directive("selfPopover", ["$compile", function ($compile) {
        return {
            restrict: "A",
            scope: {
                close: "="
            },
            link: function (scope, elem, attrs) {
                var contentId = ("popover-" + Date.now() + Math.random()).replace(".", "-");
                var $elem = $(elem);
                var style = attrs.style || "";
                var content = $(attrs.selector).html();
                var form;
                var showStatus = false;//当前弹出框的显示状态
                $elem.popover({
                        html: true,
                        content: "<div id='" + contentId + "'style='" + style + "'></div>"
                    }
                );
                $elem.on("shown.bs.popover", function () {
                    if (!form) {
                        form = $elem.parent().find("form");
                    }
                    $("#" + contentId).append(form);
                    showStatus = true;
                });
                $elem.on("hide.bs.popover", function () {
                    $elem.parent().find(".form-container").append(form);
                    showStatus = false;
                });
                $(document).click(function (event) {
                    var container = $("#" + contentId).parents(".popover")[0];
                    if (showStatus && container && !$.contains(container, event.target)) {
                        $elem.popover("hide");
                    }
                });
                scope.$watch("close", function () {
                    if (scope.close) {
                        $elem.popover('hide');
                        scope.close = false;
                    }
                });
            }
        };
    }]);
});