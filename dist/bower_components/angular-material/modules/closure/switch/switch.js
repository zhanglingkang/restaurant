/*! ppz_website 2015-02-02 10:07:15 AM */
goog.provide("ng.material.components.switch"),goog.require("ng.material.components.checkbox"),goog.require("ng.material.components.radioButton"),goog.require("ng.material.core"),function(){"use strict";function a(a,b,c){function d(a,b){var d=angular.element(a[0].querySelector(".md-switch-thumb")),f=e.compile(d,b);return function(a,b,e,g){return c(b),f(a,d,e,g)}}var e=a[0],f=b[0];return{restrict:"E",transclude:!0,template:'<div class="md-switch-bar"></div><div class="md-switch-thumb">'+f.template+"</div>",require:"?ngModel",compile:d}}angular.module("material.components.switch",["material.core","material.components.checkbox","material.components.radioButton"]).directive("mdSwitch",a),a.$inject=["mdCheckboxDirective","mdRadioButtonDirective","$mdTheming"]}();