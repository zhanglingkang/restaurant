/*! ppz_website 2015-01-12 6:59:27 PM */
"use strict";define(function(a){var b=a("app");b.directive("triggerClick",function(){return{restrict:"A",link:function(a,b,c){var d=$(b);d.bind("click",function(){$(c.triggerClick).click()})}}})});