/*! ppz_website 2015-02-10 10:45:23 AM */
"use strict";define("public/general/directive/form-reset",["app"],function(a){var b=a("app");b.directive("formReset",function(){return{restrict:"A",scope:{reset:"="},link:function(a,b){a.$watch("reset",function(){a.reset&&($(b)[0].reset(),a.reset=!1,a.$emit("formReseted"))})}}})});