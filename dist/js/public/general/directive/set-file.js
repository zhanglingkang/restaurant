/*! ppz_website 2015-01-27 5:27:15 PM */
"use strict";define("public/general/directive/set-file",["app","public/general/util","public/local/system"],function(a){{var b=a("app"),c=a("public/general/util");a("public/local/system")}b.directive("setFile",function(){return{restrict:"A",link:function(a,b,d){var e=$(b);e.bind("change",function(){c.setPropertyValue(a,d.setFile,e[0].files)})}}})});