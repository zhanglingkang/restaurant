/*! ppz_website 2015-03-20 5:16:00 PM */
"use strict";define("public/general/directive/prevent-spread",["app"],function(a){var b=a("app");b.directive("preventSpread",function(){return{restrict:"A",link:function(a,b,c){var d=$(b);d.bind(c.preventSpread,function(a){a.stopPropagation()})}}})});