/*! ppz_website 2015-02-02 10:07:15 AM */
"use strict";define("public/general/directive/prevent-spread",["app"],function(a){var b=a("app");b.directive("preventSpread",function(){return{restrict:"A",link:function(a,b,c){var d=$(b);d.bind(c.preventSpread,function(a){a.stopPropagation()})}}})});