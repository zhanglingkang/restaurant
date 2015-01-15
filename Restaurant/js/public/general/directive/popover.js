"use strict"
define(function (require, exports, module) {

    var app = require("app")
    var util = require("public/general/util")
    var computePosition = require("public/general/compute-position")
    app.directive("selfPopover", ["$compile", function ($compile) {
        /**
         * 此指令相关的属性
         * 1.relatedTarget:可选
         *  type string
         *  描述：css选择器，当指定relatedTarget时，点击relatedTarget时，出现弹出框,如果没有设置此属性，目标节点为父节点
         * 2. context:选择器的上下文，默认body。可选值parent
         * 3.autoClose 如果有此属性，点击浮框意外的部分时，自动关闭。
         * 4.container popover插件的options
         * 5.placement popover插件的options
         * 6.name 如果设置了name属性为popover，则在父scope里设置属性名为popover，值为此指令关联的scope
         */
        return {
            restrict: "E",
            terminal: true,
            scope: true,
            link: function (scope, elem, attrs, controller, transclude) {
                var $elem = $(elem)
                var targetNode = $elem.parent()
                var style = attrs.style || ""
                var template = '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content" ></div></div>'
                template = template.replace(/(?=class=['"]popover-content['"])/, "style='" + style + "' ")
                scope.close = false
                scope.$watch("close", function () {
                    if (scope.close) {
                        targetNode.popover('hide')
                        scope.close = false
                    }
                })
                if (attrs.relatedTarget) {
                    if (attrs.context === "parent") {
                        targetNode = $elem.parent().find(attrs.relatedTarget)
                    } else {
                        targetNode = $(attrs.relatedTarget)
                    }
                }
                attrs.placement = attrs.placement || "top"
                $elem.children().addClass("ng-cloak")
                $elem.remove()
                targetNode.attr("data-toggle", "popover")
                targetNode.popover({
                        html: true,
                        content: $elem.html(),
                        container: attrs.container,
                        placement: attrs.placement,
                        template: template
                    }
                )
                targetNode.on("show.bs.popover", function (event) {
                    targetNode.data("bs.popover").$tip.addClass("popover-hidden")
                })
                targetNode.on("shown.bs.popover", function (event) {
//                    targetNode.data("bs.popover").$tip.hide()
                    var popoverContent = targetNode.data("bs.popover").$tip.find(".popover-content")
                    $compile(popoverContent.children())(scope.$parent)
                    if ("autoClose" in attrs) {
                        $(document).bind("click", autoClose)
                    }
                    setTimeout(function () {
                        //因为bootstrap中.popover.top的margin-top为-10px,.popover.bottom的maigin-top为10px,.popover.left、.popover.right类似
                        var pos = computePosition.getPosition(targetNode.data("bs.popover").$tip[0], targetNode[0], attrs.placement, attrs.container, 1)
                        targetNode.data("bs.popover").$tip.css(pos)
                        targetNode.data("bs.popover").$tip.removeClass("popover-hidden")
                    }, 0)
                    scope.$apply()
                })
                targetNode.on("hidden.bs.popover", function (event) {
                    $(document).unbind("click", autoClose)
                })
                function autoClose(event) {
                    if (targetNode.data("bs.popover")) {
                        var container = targetNode.data("bs.popover").$tip[0]
                        if (container && !$.contains(container, event.target)) {
                            targetNode.popover("hide")
                        }
                    }
                }

                scope.$on("closePopover", function (event, popoverName) {
                    if (popoverName === attrs.name) {
                        targetNode.popover("hide")
                    }
                })
                var externalAPI = {
                    close: function () {
                        scope.close = true
                    }
                }
                if ("name" in attrs) {
                    var propertyName = attrs.name
                    if ("object" in attrs) {
                        propertyName = attrs.object + "." + attrs.name
                    }
                    util.setPropertyValue(scope.$parent, propertyName, externalAPI)
                }
            }
        }
    }])
})