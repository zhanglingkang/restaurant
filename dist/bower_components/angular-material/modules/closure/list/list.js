/*! ppz_website 2015-01-27 4:31:55 PM */
goog.provide("ng.material.components.list"),goog.require("ng.material.core"),function(){"use strict";function a(){return{restrict:"E",link:function(a,b){b.attr({role:"list"})}}}function b(){return{restrict:"E",link:function(a,b){b.attr({role:"listitem"})}}}angular.module("material.components.list",["material.core"]).directive("mdList",a).directive("mdItem",b)}();