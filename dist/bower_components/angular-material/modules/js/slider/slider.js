/*! ppz_website 2014-12-18 6:38:47 PM */
!function(){"use strict";function a(a){function c(b,c,d,e){a(c);var f=e[0]||{$setViewValue:function(a){this.$viewValue=a,this.$viewChangeListeners.forEach(function(a){a()})},$parsers:[],$formatters:[],$viewChangeListeners:[]},g=e[1];g.init(f)}return{scope:{},require:["?ngModel","mdSlider"],controller:b,template:'<div class="md-track-container"><div class="md-track"></div><div class="md-track md-track-fill"></div><div class="md-track-ticks"></div></div><div class="md-thumb-container"><div class="md-thumb"></div><div class="md-focus-thumb"></div><div class="md-focus-ring"></div><div class="md-sign"><span class="md-thumb-text"></span></div><div class="md-disabled-thumb"></div></div>',link:c}}function b(a,b,c,d,e,f,g,h){this.init=function(i){function j(){p(),t(),o()}function k(a){Q=parseFloat(a),b.attr("aria-valuemin",a),j()}function l(a){R=parseFloat(a),b.attr("aria-valuemax",a),j()}function m(a){S=parseFloat(a),o()}function n(a){b.attr("aria-disabled",!!a)}function o(){if(angular.isDefined(c.mdDiscrete)){var a=Math.floor((R-Q)/S);T||(T=angular.element('<canvas style="position:absolute;">'),U=T[0].getContext("2d"),U.fillStyle="black",L.append(T));var b=q();T[0].width=b.width,T[0].height=b.height;for(var d,e=0;a>=e;e++)d=Math.floor(b.width*(e/a)),U.fillRect(d-1,0,2,b.height)}}function p(){V=J[0].getBoundingClientRect()}function q(){return M(),V}function r(c){if(!b[0].hasAttribute("disabled")){var d;c.keyCode===h.KEY_CODE.LEFT_ARROW?d=-S:c.keyCode===h.KEY_CODE.RIGHT_ARROW&&(d=S),d&&((c.metaKey||c.ctrlKey||c.altKey)&&(d*=4),c.preventDefault(),c.stopPropagation(),a.$evalAsync(function(){s(i.$viewValue+d)}))}}function s(a){i.$setViewValue(u(v(a)))}function t(){isNaN(i.$viewValue)&&(i.$viewValue=i.$modelValue);var c=(i.$viewValue-Q)/(R-Q);a.modelValue=i.$viewValue,b.attr("aria-valuenow",i.$viewValue),w(c),H.text(i.$viewValue)}function u(a){return angular.isNumber(a)?Math.max(Q,Math.min(R,a)):void 0}function v(a){return angular.isNumber(a)?Math.round(a/S)*S:void 0}function w(a){K.css("width",100*a+"%"),I.css(h.CSS.TRANSFORM,"translate3d("+q().width*a+"px,0,0)"),b.toggleClass("md-min",0===a)}function x(a){W||a.eventType!==Hammer.INPUT_START||b[0].hasAttribute("disabled")?W&&a.eventType===Hammer.INPUT_END&&(W&&X&&A(a),W=!1,b.removeClass("panning active")):(W=!0,b.addClass("active"),b[0].focus(),p(),z(a),a.srcEvent.stopPropagation())}function y(){W&&b.addClass("panning")}function z(a){W&&(X?C(a.center.x):B(a.center.x),a.preventDefault(),a.srcEvent.stopPropagation())}function A(a){if(X&&!b[0].hasAttribute("disabled")){var c=E(D(a.center.x)),e=u(v(c));w(F(e)),d(function(){s(e)}),a.preventDefault(),a.srcEvent.stopPropagation()}}function B(b){a.$evalAsync(function(){s(E(D(b)))})}function C(a){var b=E(D(a)),c=u(v(b));w(D(a)),H.text(c)}function D(a){return Math.max(0,Math.min(1,(a-V.left)/V.width))}function E(a){return Q+a*(R-Q)}function F(a){return(a-Q)/(R-Q)}var G=angular.element(b[0].querySelector(".md-thumb")),H=angular.element(b[0].querySelector(".md-thumb-text")),I=G.parent(),J=angular.element(b[0].querySelector(".md-track-container")),K=angular.element(b[0].querySelector(".md-track-fill")),L=angular.element(b[0].querySelector(".md-track-ticks")),M=g.throttle(p,5e3);c.min?c.$observe("min",k):k(0),c.max?c.$observe("max",l):l(100),c.step?c.$observe("step",m):m(1);var N=angular.noop;c.ngDisabled&&(N=a.$parent.$watch(c.ngDisabled,n)),f.expect(b,"aria-label"),b.attr("tabIndex",0),b.attr("role","slider"),b.on("keydown",r);var O=new Hammer(b[0],{recognizers:[[Hammer.Pan,{direction:Hammer.DIRECTION_HORIZONTAL}]]});O.on("hammer.input",x),O.on("panstart",y),O.on("pan",z),O.on("panend",A),setTimeout(j);var P=d.debounce(j);angular.element(e).on("resize",P),a.$on("$destroy",function(){angular.element(e).off("resize",P),O.destroy(),N()}),i.$render=t,i.$viewChangeListeners.push(t),i.$formatters.push(u),i.$formatters.push(v);var Q,R,S,T,U,V={};p();var W=!1,X=angular.isDefined(c.mdDiscrete);this._onInput=x,this._onPanStart=y,this._onPan=z}}angular.module("material.components.slider",["material.core"]).directive("mdSlider",a),a.$inject=["$mdTheming"],b.$inject=["$scope","$element","$attrs","$$rAF","$window","$mdAria","$mdUtil","$mdConstant"]}();