/*! ppz_website 2015-02-10 10:45:23 AM */
!function(){"use strict";function a(a,b,c,d,e,f){function g(g,k,l,m){function n(b){n.value=!!b,n.queued||(b?(n.queued=!0,a(function(){g.visible=n.value,n.queued=!1},h)):a(function(){g.visible=!1}))}function o(){k.removeClass("md-hide"),r.attr("aria-describedby",k.attr("id")),j.append(k),c(function(){c(function(){q(),g.visible&&k.addClass("md-show")})})}function p(){k.removeClass("md-show").addClass("md-hide"),r.removeAttr("aria-describedby"),a(function(){g.visible||k.detach()},200,!1)}function q(){var a=k[0].getBoundingClientRect(),c=r[0].getBoundingClientRect();m&&(c.top+=m.$element.prop("scrollTop"),c.left+=m.$element.prop("scrollLeft"));var d="bottom",e={left:c.left+c.width/2-a.width/2,top:c.top+c.height};e.left=Math.min(e.left,b.innerWidth-a.width-i),e.left=Math.max(e.left,i),e.top+a.height>b.innerHeight&&(e.top=c.top-a.height,d="top"),k.css({top:e.top+"px",left:e.left+"px"}),k.attr("width-32",Math.ceil(a.width/32)),k.attr("md-direction",d)}f(k);var r=k.parent();k.detach(),k.attr("role","tooltip"),k.attr("id",l.id||"tooltip_"+e.nextUid()),r.on("focus mouseenter touchstart",function(){n(!0)}),r.on("blur mouseleave touchend touchcancel",function(){d.activeElement!==r[0]&&n(!1)}),g.$watch("visible",function(a){a?o():p()});var s=c.debounce(function(){g.visible&&q()});angular.element(b).on("resize",s),g.$on("$destroy",function(){g.visible=!1,k.remove(),angular.element(b).off("resize",s)})}var h=400,i=8,j=angular.element(document.body);return{restrict:"E",transclude:!0,require:"^?mdContent",template:'<div class="md-background"></div><div class="md-content" ng-transclude></div>',scope:{visible:"=?mdVisible"},link:g}}angular.module("material.components.tooltip",["material.core"]).directive("mdTooltip",a),a.$inject=["$timeout","$window","$$rAF","$document","$mdUtil","$mdTheming"]}();