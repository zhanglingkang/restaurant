/*! ppz_website 2015-01-27 4:24:49 PM */
!function(){"use strict";function a(){return{restrict:"E"}}function b(a){function b(a,b,c,d,e){function f(d,f,g){f.addClass(g.position.split(" ").map(function(a){return"md-"+a}).join(" ")),g.parent.addClass(h(g.position));var i=c(d,"swipeleft swiperight");return g.detachSwipe=i(f,function(b){f.addClass("md-"+b.type),a(e.cancel)}),b.enter(f,g.parent)}function g(a,c,d){return d.detachSwipe(),d.parent.removeClass(h(d.position)),b.leave(c)}function h(a){return"md-toast-open-"+(a.indexOf("top")>-1?"top":"bottom")}return{onShow:f,onRemove:g,position:"bottom left",themable:!0,hideDelay:3e3}}return b.$inject=["$timeout","$animate","$mdSwipe","$mdTheming","$mdToast"],a("$mdToast").setDefaults({methods:["position","hideDelay","capsule"],options:b}).addPreset("simple",{argOption:"content",methods:["content","action","highlightAction"],options:["$mdToast",function(a){return{template:["<md-toast ng-class=\"{'md-capsule': toast.capsule}\">","<span flex>{{ toast.content }}</span>",'<md-button ng-if="toast.action" ng-click="toast.resolve()" ng-class="{\'md-action\': toast.highlightAction}">',"{{toast.action}}","</md-button>","</md-toast>"].join(""),controller:function(){this.resolve=function(){a.hide()}},controllerAs:"toast",bindToController:!0}}]})}angular.module("material.components.toast",["material.core","material.components.swipe","material.components.button"]).directive("mdToast",a).provider("$mdToast",b),b.$inject=["$$interimElementProvider"]}();