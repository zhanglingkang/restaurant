/*! ppz_website 2015-01-27 4:24:49 PM */
"use strict";define("index/directive",["app"],function(a){var b=a("app");b.directive("deleteDatePicker",[function(){return{restrict:"A",link:function(a){a.$on("$locationChangeStart",function(){$("body .datetimepicker").remove()})}}}])});