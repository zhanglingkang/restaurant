/*! ppz_website 2015-01-12 6:59:27 PM */
goog.provide("ng.material.components.icon"),goog.require("ng.material.core"),function(){"use strict";function a(){return{restrict:"E",template:'<object class="md-icon"></object>',compile:function(a,b){var c=angular.element(a[0].children[0]);angular.isDefined(b.icon)&&c.attr("data",b.icon)}}}angular.module("material.components.icon",["material.core"]).directive("mdIcon",a)}();