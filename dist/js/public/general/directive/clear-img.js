/*! ppz_website 2015-02-05 3:20:31 PM */
"use strict";define("public/general/directive/clear-img",["app"],function(a){var b=a("app");b.directive("clearImg",function(){return{restrict:"A",scope:{clear:"="},link:function(a,b){a.$watch("clear",function(){a.clear&&($(b)[0].src="",a.clear=!1)})}}})});