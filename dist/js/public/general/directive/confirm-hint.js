/*! ppz_website 2015-01-12 6:59:27 PM */
"use strict";define(function(a){var b=a("app"),c=$("#modal-hint");c.modal({keyboard:!1,show:!1,backdrop:!1}),b.directive("confirmHint",function(){return{restrict:"A",link:function(a,b,d){var e=$(b),f=!1;document.addEventListener("click",function(a){e[0]===a.target&&(f?f=!1:(a.stopPropagation(),c.find(".modal-title").html(d.modalTitle),c.find(".modal-body").html(d.modalContent),c.modal("show"),c.find(".confirm")[0].onclick=function(){f=!0,c.modal("hide"),a.target.click()}))},!0)}}})});