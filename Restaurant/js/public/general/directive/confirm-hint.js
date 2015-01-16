"use strict"
define(function (require, exports, module) {
    var app = require("app")
    var $modal = $("#modal-hint")
    $modal.modal({
        keyboard: false,
        show: false,
        backdrop: false
    })
    app.directive("confirmHint", function () {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                var $elem = $(elem)
                var confirmed = false
                document.addEventListener("click", function (event) {
                    if ($elem[0] === event.target) {
                        if (!confirmed) {
                            event.stopPropagation()
                            $modal.find(".modal-title").html(attrs.modalTitle)
                            $modal.find(".modal-body").html(attrs.modalContent)
                            $modal.modal('show')
                            $modal.find(".confirm")[0].onclick = function () {
                                confirmed = true
                                $modal.modal('hide')
                                event.target.click()
                            }
                        } else {
                            confirmed = false
                        }
                    }
                }, true)
                $modal.on("show.bs.modal", function () {
                    window.addEventListener("click", stopPropagation, true)
                })
                $modal.on("hidden.bs.modal", function () {
                    window.removeEventListener("click", stopPropagation, true)
                })
                function stopPropagation(event) {
                    //如果点击的按钮既不是确认也不是取消，就阻止事件传播
                    if (!$.contains($modal.find(".modal-footer")[0], event.target)) {
                        event.stopPropagation()
                    }
                }
            }
        }
    })
})