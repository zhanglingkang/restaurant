/*! ppz_website 2015-02-05 3:57:11 PM */
!function(){"use strict";function a(){return{restrict:"E",template:'<object class="md-icon"></object>',compile:function(a,b){var c=angular.element(a[0].children[0]);angular.isDefined(b.icon)&&c.attr("data",b.icon)}}}angular.module("material.components.icon",["material.core"]).directive("mdIcon",a)}();