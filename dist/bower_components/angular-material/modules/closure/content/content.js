/*! ppz_website 2015-02-03 11:00:22 AM */
goog.provide("ng.material.components.content"),goog.require("ng.material.core"),function(){"use strict";function a(a){function b(a,b){this.$scope=a,this.$element=b}return{restrict:"E",controller:["$scope","$element",b],link:function(b,c){a(c),b.$broadcast("$mdContentLoaded",c)}}}angular.module("material.components.content",["material.core"]).directive("mdContent",a),a.$inject=["$mdTheming"]}();