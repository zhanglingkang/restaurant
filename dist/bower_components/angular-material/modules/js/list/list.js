/*! ppz_website 2015-03-20 5:16:00 PM */
!function(){"use strict";function a(){return{restrict:"E",link:function(a,b){b.attr({role:"list"})}}}function b(){return{restrict:"E",link:function(a,b){b.attr({role:"listitem"})}}}angular.module("material.components.list",["material.core"]).directive("mdList",a).directive("mdItem",b)}();