/*! ppz_website 2015-02-05 3:57:11 PM */
"use strict";define("public/general/directive/confirm-hint",["app"],function(a){var b=a("app"),c=$("#modal-hint");c.modal({keyboard:!1,show:!1,backdrop:!1}),b.directive("confirmHint",function(){return{restrict:"A",link:function(a,b,d){function e(a){$.contains(c.find(".modal-footer")[0],a.target)||a.stopPropagation()}var f=$(b),g=!1;document.addEventListener("click",function(a){f[0]===a.target&&(g?g=!1:(a.stopPropagation(),c.find(".modal-title").html(d.modalTitle),c.find(".modal-body").html(d.modalContent),c.modal("show"),c.find(".confirm")[0].onclick=function(){g=!0,c.modal("hide"),a.target.click()}))},!0),c.on("show.bs.modal",function(){window.addEventListener("click",e,!0)}),c.on("hidden.bs.modal",function(){window.removeEventListener("click",e,!0)})}}})});