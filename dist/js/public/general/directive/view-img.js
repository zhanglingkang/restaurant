/*! ppz_website 2015-02-05 3:57:11 PM */
"use strict";define("public/general/directive/view-img",["app"],function(a){var b=a("app"),c=$("#modal-view-img");c.modal({show:!1}),b.directive("viewImg",function(){return{restrict:"A",link:function(a,b,d){var e=$(b);e.bind("click",function(){e.attr("src")&&(c.find(".modal-title").html(d.imgTitle),c.find(".modal-body img").attr("src",e.attr("src")),c.modal("show"))})}}})});