/*! ppz_website 2015-01-27 4:24:49 PM */
goog.provide("ng.material.components.swipe"),function(){"use strict";function a(){return function(a,b){return b||(b="swipeleft swiperight"),function(c,d,e){function f(b){b.srcEvent.stopPropagation(),angular.isFunction(d)&&a.$apply(function(){d(b)})}function g(){return i.on(b,f),function(){i.off(b)}}function h(a,b){var c=b.indexOf("pan")>-1,d=b.indexOf("swipe")>-1;return c&&a.push([Hammer.Pan,{direction:Hammer.DIRECTION_HORIZONTAL}]),d&&a.push([Hammer.Swipe,{direction:Hammer.DIRECTION_HORIZONTAL}]),a}var i=new Hammer(c[0],{recognizers:h([],b)});return e||g(),a.$on("$destroy",function(){i.destroy()}),g}}}function b(a,b){return{restrict:"A",link:d(a,b,"SwipeLeft")}}function c(a,b){return{restrict:"A",link:d(a,b,"SwipeRight")}}function d(a,b,c){return function(d,e,f){var g=c.toLowerCase(),h="md"+c,i=a(f[h])||angular.noop,j=b(d,g),k=function(a){i(d,a)};j(e,function(a){a.type==g&&k()})}}angular.module("material.components.swipe",[]).factory("$mdSwipe",a).directive("mdSwipeLeft",b).directive("mdSwipeRight",c),b.$inject=["$parse","$mdSwipe"],c.$inject=["$parse","$mdSwipe"]}();