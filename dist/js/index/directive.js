/*! ppz_website 2015-02-02 10:07:15 AM */
"use strict";define("index/directive",["app"],function(a){var b=a("app");b.directive("deleteDatePicker",[function(){return{restrict:"A",link:function(a){a.$on("$locationChangeStart",function(){$("body .datetimepicker").remove()})}}}])});