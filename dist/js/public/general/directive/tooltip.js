/*! ppz_website 2015-01-27 4:31:55 PM */
"use strict";define("public/general/directive/tooltip",["app"],function(a){var b=a("app");b.directive("tooltip",function(){return{restrict:"A",link:function(a,b,c){var d=$(b),e=c.tooltip||30,f=new MutationObserver(function(){var a=d.html().trim();a.replace(/\.\.\.$/,"").length>e&&d.html(a.substring(0,e)+"...")});f.observe(d[0].childNodes[0],{characterData:!0}),d.tooltip({delay:{show:0,hide:0}})}}})});