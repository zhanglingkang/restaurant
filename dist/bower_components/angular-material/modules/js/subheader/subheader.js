/*! ppz_website 2015-02-05 3:20:31 PM */
!function(){"use strict";function a(a,b,c){return{restrict:"E",replace:!0,transclude:!0,template:'<h2 class="md-subheader"><span class="md-subheader-content"></span></h2>',compile:function(d,e,f){var g=d[0].outerHTML;return function(d,e){function h(a){return angular.element(a[0].querySelector(".md-subheader-content"))}c(e),f(d,function(a){h(e).append(a)}),f(d,function(f){var i=b(angular.element(g))(d);c(i),h(i).append(f),a(d,e,i)})}}}}angular.module("material.components.subheader",["material.core","material.components.sticky"]).directive("mdSubheader",a),a.$inject=["$mdSticky","$compile","$mdTheming"]}();