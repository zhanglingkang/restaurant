/*! ppz_website 2015-03-20 5:16:00 PM */
!function(){"use strict";function a(a,b,c,d){return{restrict:"E",controller:angular.noop,link:function(e,f,g){function h(){function d(b,c){f.parent()[0]===c.parent()[0]&&(k&&k.off("scroll",o),c.on("scroll",o),c.attr("scroll-shrink","true"),k=c,a(h))}function h(){j=f.prop("offsetHeight"),k.css("margin-top",-j*n+"px"),i()}function i(a){var c=a?a.target.scrollTop:m;p(),l=Math.min(j/n,Math.max(0,l+c-m)),f.css(b.CSS.TRANSFORM,"translate3d(0,"+-l*n+"px,0)"),k.css(b.CSS.TRANSFORM,"translate3d(0,"+(j-l)*n+"px,0)"),m=c}var j,k,l=0,m=0,n=g.mdShrinkSpeedFactor||.5,o=a.debounce(i),p=c.debounce(h,5e3);e.$on("$mdContentLoaded",d)}d(f),angular.isDefined(g.mdScrollShrink)&&h()}}}angular.module("material.components.toolbar",["material.core","material.components.content"]).directive("mdToolbar",a),a.$inject=["$$rAF","$mdConstant","$mdUtil","$mdTheming"]}();