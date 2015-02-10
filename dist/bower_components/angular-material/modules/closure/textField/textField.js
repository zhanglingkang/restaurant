/*! ppz_website 2015-02-10 10:45:23 AM */
goog.provide("ng.material.components.textField"),goog.require("ng.material.core"),function(){"use strict";function a(a,b,c){return{restrict:"E",replace:!0,scope:{fid:"@?mdFid",label:"@?",value:"=ngModel"},compile:function(d,e){return angular.isUndefined(e.mdFid)&&(e.mdFid=b.nextUid()),{pre:function(a,b,d){var e=c(d.ngDisabled);a.isDisabled=function(){return e(a.$parent)},a.inputType=d.type||"text"},post:a}},template:'<md-input-group tabindex="-1"> <label for="{{fid}}" >{{label}}</label> <md-input id="{{fid}}" ng-disabled="isDisabled()" ng-model="value" type="{{inputType}}"></md-input></md-input-group>'}}function b(){return{restrict:"CE",controller:["$element",function(a){this.setFocused=function(b){a.toggleClass("md-input-focused",!!b)},this.setHasValue=function(b){a.toggleClass("md-input-has-value",b)}}]}}function c(){return{restrict:"E",replace:!0,template:"<input >",require:["^?mdInputGroup","?ngModel"],link:function(a,b,c,d){function e(a){return a=angular.isUndefined(a)?b.val():a,angular.isDefined(a)&&null!==a&&""!==a.toString().trim()}if(d[0]){var f=d[0],g=d[1];a.$watch(a.isDisabled,function(a){b.attr("aria-disabled",!!a),b.attr("tabindex",!!a)}),b.attr("type",c.type||b.parent().attr("type")||"text"),g&&g.$formatters.push(function(a){return f.setHasValue(e(a)),a}),b.on("input",function(){f.setHasValue(e())}).on("focus",function(){f.setFocused(!0)}).on("blur",function(){f.setFocused(!1),f.setHasValue(e())}),a.$on("$destroy",function(){f.setFocused(!1),f.setHasValue(!1)})}}}}angular.module("material.components.textField",["material.core"]).directive("mdInputGroup",b).directive("mdInput",c).directive("mdTextFloat",a),a.$inject=["$mdTheming","$mdUtil","$parse"],c.$inject=["$mdUtil"]}();