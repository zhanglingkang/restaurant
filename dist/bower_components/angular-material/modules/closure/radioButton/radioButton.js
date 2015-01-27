/*! ppz_website 2015-01-27 4:24:49 PM */
goog.provide("ng.material.components.radioButton"),goog.require("ng.material.core"),function(){"use strict";function a(a,b,c){function d(a,d,e,f){function g(a){a.keyCode===b.KEY_CODE.LEFT_ARROW||a.keyCode===b.KEY_CODE.UP_ARROW?(a.preventDefault(),h.selectPrevious()):(a.keyCode===b.KEY_CODE.RIGHT_ARROW||a.keyCode===b.KEY_CODE.DOWN_ARROW)&&(a.preventDefault(),h.selectNext())}c(d);var h=f[0],i=f[1]||{$setViewValue:angular.noop};h.init(i),d.attr({role:"radiogroup",tabIndex:d.attr("tabindex")||"0"}).on("keydown",g)}function e(a){this._radioButtonRenderFns=[],this.$element=a}function f(){return{init:function(a){this._ngModelCtrl=a,this._ngModelCtrl.$render=angular.bind(this,this.render)},add:function(a){this._radioButtonRenderFns.push(a)},remove:function(a){var b=this._radioButtonRenderFns.indexOf(a);-1!==b&&this._radioButtonRenderFns.splice(b,1)},render:function(){this._radioButtonRenderFns.forEach(function(a){a()})},setViewValue:function(a,b){this._ngModelCtrl.$setViewValue(a,b),this.render()},getViewValue:function(){return this._ngModelCtrl.$viewValue},selectNext:function(){return g(this.$element,1)},selectPrevious:function(){return g(this.$element,-1)},setActiveDescendant:function(a){this.$element.attr("aria-activedescendant",a)}}}function g(b,c){var d=a.iterator(Array.prototype.slice.call(b[0].querySelectorAll("md-radio-button")),!0);if(d.count()){var e=b[0].querySelector("md-radio-button.md-checked"),f=d[0>c?"previous":"next"](e)||d.first();angular.element(f).triggerHandler("click")}}return e.prototype=f(),{restrict:"E",controller:["$element",e],require:["mdRadioGroup","?ngModel"],link:d}}function b(a,b,c){function d(d,f,g,h){function i(a){f[0].hasAttribute("disabled")||d.$apply(function(){h.setViewValue(g.value,a&&a.type)})}function j(){var a=h.getViewValue()===g.value;a!==l&&(l=a,f.attr("aria-checked",a),a?(f.addClass(e),h.setActiveDescendant(f.attr("id"))):f.removeClass(e))}function k(c,d){function e(){return g.id||"radio_"+b.nextUid()}d.ariaId=e(),c.attr({id:d.ariaId,role:"radio","aria-checked":"false"}),a.expectWithText(c,"aria-label")}var l;c(f),k(f,d),h.add(j),g.$observe("value",j),f.on("click",i).on("$destroy",function(){h.remove(j)})}var e="md-checked";return{restrict:"E",require:"^mdRadioGroup",transclude:!0,template:'<div class="md-container" md-ink-ripple md-ink-ripple-checkbox><div class="md-off"></div><div class="md-on"></div></div><div ng-transclude class="md-label"></div>',link:d}}angular.module("material.components.radioButton",["material.core"]).directive("mdRadioGroup",a).directive("mdRadioButton",b),a.$inject=["$mdUtil","$mdConstant","$mdTheming"],b.$inject=["$mdAria","$mdUtil","$mdTheming"]}();