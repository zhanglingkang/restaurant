/*! ppz_website 2014-10-16 6:36:22 PM */
var FLOAT_REGEXP=/^\-?\d+((\.|\,)\d+)?$/;angular.module("ppzDirectives",[]).directive("menuManager",function(){return{restrict:"E",scope:{},controller:function(){},templateUrl:"partials/menu.html"}}).directive("smartFloat",function(){return{require:"ngModel",link:function(a,b,c,d){d.$parsers.unshift(function(a){return FLOAT_REGEXP.test(a)?(d.$setValidity("float",!0),parseFloat(a.replace(",","."))):void d.$setValidity("float",!1)})}}}).directive("fileModel",function(){return{restrict:"A",link:function(a,b,c){var d=$(b);d.bind("change",function(){a.$apply(function(){a[c.fileModel]=d[0].files})})}}}).directive("confirmHint",function(){var a=$("#modal-hint");return a.modal({keyboard:!1,show:!1,backdrop:!1}),{restrict:"A",link:function(b,c,d){var e=$(c),f=!1;document.addEventListener("click",function(b){e[0]===b.target&&(f?f=!1:(b.stopPropagation(),a.find(".modal-title").html(d.modalTitle),a.find(".modal-body").html(d.modalContent),a.modal("show"),a.find(".confirm")[0].onclick=function(){f=!0,a.modal("hide"),b.target.click()}))},!0)}}}).directive("preventSpread",function(){return{restrict:"A",link:function(a,b,c){var d=$(b);d.bind(c.preventSpread,function(a){a.stopPropagation()})}}}).directive("viewImg",function(){var a=$("#modal-view-img");return a.modal({show:!1}),{restrict:"A",link:function(b,c,d){var e=$(c);e.bind("click",function(){e.attr("src")&&(a.find(".modal-title").html(d.imgTitle),a.find(".modal-body img").attr("src",e.attr("src")),a.modal("show"))})}}});