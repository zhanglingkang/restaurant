/*! ppz_website 2015-02-05 3:57:11 PM */
goog.provide("ng.material.components.bottomSheet"),goog.require("ng.material.components.backdrop"),goog.require("ng.material.core"),function(){"use strict";function a(){return{restrict:"E"}}function b(a){function b(a,b,c,d,e,f,g,h){function i(d,i,j){l=e('<md-backdrop class="md-opaque md-bottom-sheet-backdrop">')(d),l.on("click touchstart",function(){c(g.cancel)}),f.inherit(l,j.parent),a.enter(l,j.parent,null);var m=new k(i);return j.bottomSheet=m,j.targetEvent&&angular.element(j.targetEvent.target).blur(),f.inherit(m.element,j.parent),a.enter(m.element,j.parent).then(function(){var a=angular.element(i[0].querySelector("button")||i[0].querySelector("a")||i[0].querySelector("[ng-click]"));a.focus(),j.escapeToClose&&(j.rootElementKeyupCallback=function(a){a.keyCode===b.KEY_CODE.ESCAPE&&c(g.cancel)},h.on("keyup",j.rootElementKeyupCallback))})}function j(b,c,d){var e=d.bottomSheet;return a.leave(l),a.leave(e.element).then(function(){e.cleanup(),d.targetEvent&&angular.element(d.targetEvent.target).focus()})}function k(a){function d(c){c.preventDefault(),o=c.target,k=h(c),n=a.css(b.CSS.TRANSITION_DURATION),a.css(b.CSS.TRANSITION_DURATION,"0s")}function e(d){a.css(b.CSS.TRANSITION_DURATION,n);var e=h(d);Math.abs(e-k)<5&&d.target==o?angular.element(d.target).triggerHandler("click"):m>r?c(g.cancel):i(void 0)}function f(a){var b=h(a),c=b-k;m=b-l,l=b,c=j(c),i(c+p)}function h(a){var b=a.touches&&a.touches.length?a.touches[0]:a.changedTouches[0];return b.clientY}function i(c){null===c||void 0===c?a.css(b.CSS.TRANSFORM,""):a.css(b.CSS.TRANSFORM,"translate3d(0, "+c+"px, 0)")}function j(a){if(0>a&&-p+q>a){a=-a;var b=p-q;a=Math.max(-p,-Math.min(p-5,b+q*(a-b)/p)-a/50)}return a}var k,l,m,n,o,p=80,q=20,r=10;return a=a.eq(0),a.on("touchstart",d).on("touchmove",f).on("touchend",e),{element:a,cleanup:function(){a.off("touchstart",d).off("touchmove",f).off("touchend",e)}}}var l;return{themable:!0,targetEvent:null,onShow:i,onRemove:j,escapeToClose:!0}}return b.$inject=["$animate","$mdConstant","$timeout","$$rAF","$compile","$mdTheming","$mdBottomSheet","$rootElement"],a("$mdBottomSheet").setDefaults({options:b})}angular.module("material.components.bottomSheet",["material.core","material.components.backdrop"]).directive("mdBottomSheet",a).provider("$mdBottomSheet",b),b.$inject=["$$interimElementProvider"]}();