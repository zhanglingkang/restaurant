/*! ppz_website 2015-02-05 3:20:31 PM */
"use strict";define("public/general/directive/ng-model",["app","public/general/util"],function(a){var b=a("app"),c=a("public/general/util");b.directive("ngModel",function(){return{restrict:"A",link:function(a,b,d){var e=$(b);"INPUT"===e[0].nodeName&&"file"===e.attr("type")&&e.bind("change",function(){a.$apply(function(){var b=e[0].multiple?e[0].files:e[0].files[0];c.setPropertyValue(a,d.ngModel,b)})})}}})});