"use strict"
define(function (require, exports, module) {

    var app = require("app")
    var util = require("public/general/util")
    var computePosition = require("public/general/compute-position")
    app.directive("selfPopover", ["$compile", function ($compile) {
        /**
         * 此指令相关的属性
         * - relatedTarget:可选
         *  type string
         *  描述：css选择器，当指定relatedTarget时，点击relatedTarget时，出现弹出框,如果没有设置此属性，目标节点为父节点
         * - context:选择器的上下文，默认body。可选值parent
         * - autoClose 如果有此属性，点击浮框意外的部分时，自动关闭。
         * - exclude 在autoClose为true时生效，exclude的值为选择器，如果点击元素是exclude选择器对应元素的后代，则浮框不关闭
         * - container popover插件的options
         * - placement popover插件的options
         * - name 如果设置了name属性为popover，则在父scope里设置属性名为popover，值为此指令关联的scope
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
                    targetNode.data("bs.popover").$tip.addClass(attrs.class)
                    targetNode.data("bs.popover").$tip.addClass("popover-hidden")
                })
                targetNode.on("shown.bs.popover", function (event) {
                    targetNode.data("bs.popover").$tip.css({
                        left: 0,
                        top: 0
                    })
                    var popoverContent = targetNode.data("bs.popover").$tip.find(".popover-content")
                    $compile(popoverContent.children())(scope.$parent)
                    if ("autoClose" in attrs) {
//                        $(document).bind("click", autoClose)
                        document.addEventListener("click", autoClose, true)
                    }
                    setTimeout(function () {
                        updateTooltipPos()
                    }, 0)
                    var interval = setInterval(function () {
                        if (!targetNode.data("bs.popover").$tip || !targetNode.data("bs.popover").$tip[0] || !$.contains(document.body, targetNode.data("bs.popover").$tip[0])) {
                            clearInterval(interval)
                            return
                        }
                        var size = computePosition.getSize(targetNode.data("bs.popover").$tip[0])
                        if (size.width !== updateTooltipPos.last.width || size.height !== updateTooltipPos.last.height) {
                            updateTooltipPos()
                        }
                    }, 200)
                    scope.$apply()
                })
                targetNode.on("hidden.bs.popover", function (event) {
//                    $(document).unbind("click", autoClose)
                    document.removeEventListener("click", autoClose, true)
                })


                function autoClose(event) {
                    if (!targetNode.data("bs.popover")) {
                        document.removeEventListener("click", autoClose, true)
                    }
                    if (targetNode.data("bs.popover")) {
                        var container = targetNode.data("bs.popover").$tip[0]
                        if (container && !$.contains(container, event.target)) {
                            if (!attrs.exclude || !$.contains($(attrs.exclude)[0], event.target)) {
                                targetNode.popover("hide")
                            }
                        }
                    }
                    if ($.contains(targetNode[0], event.target) || targetNode[0] === event.target) {
                        event.stopPropagation()
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
                function updateTooltipPos() {
                    //因为bootstrap中.popover.top的margin-top为-10px,.popover.bottom的maigin-top为10px,.popover.left、.popover.right类似
                    var pos = computePosition.getPosition(targetNode.data("bs.popover").$tip[0], targetNode[0], attrs.placement, attrs.container, 1)
                    targetNode.data("bs.popover").$tip.css({
                        left: pos.left,
                        top: pos.top
                    })
                    if (pos.arrowPosition) {
                        if (attrs.placement === "top" || attrs.placement === "bottom") {
                            targetNode.data("bs.popover").$tip.find(".arrow").css({
                                left: pos.arrowPosition
                            })
                        }
                    }
                    targetNode.data("bs.popover").$tip.removeClass("popover-hidden")
                    updateTooltipPos.last = {
                        width: computePosition.getSize(targetNode.data("bs.popover").$tip[0]).width,
                        height: computePosition.getSize(targetNode.data("bs.popover").$tip[0]).height
                    }
                }

            }
        }
    }])
})