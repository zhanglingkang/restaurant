/*! ppz_website 2015-02-03 11:00:22 AM */
!function(){"use strict";function a(a,b,c,d,e){function f(b,f){return f.type="checkbox",f.tabIndex=0,b.attr("role",f.type),function(f,h,i,j){function k(a){a.which===d.KEY_CODE.SPACE&&(a.preventDefault(),l(a))}function l(a){h[0].hasAttribute("disabled")||f.$apply(function(){n=!n,j.$setViewValue(n,a&&a.type),j.$render()})}function m(){n=j.$viewValue,n?h.addClass(g):h.removeClass(g)}var n=!1;e(h),j=j||{$setViewValue:function(a){this.$viewValue=a},$parsers:[],$formatters:[]},c.expectWithText(b,"aria-label"),a.link.pre(f,{on:angular.noop,0:{}},i,[j]),h.on("click",l),h.on("keypress",k),j.$render=m}}a=a[0];var g="md-checked";return{restrict:"E",transclude:!0,require:"?ngModel",template:'<div class="md-container" md-ink-ripple md-ink-ripple-checkbox><div class="md-icon"></div></div><div ng-transclude class="md-label"></div>',compile:f}}angular.module("material.components.checkbox",["material.core"]).directive("mdCheckbox",a),a.$inject=["inputDirective","$mdInkRipple","$mdAria","$mdConstant","$mdTheming"]}();