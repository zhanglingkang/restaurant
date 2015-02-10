/*! ppz_website 2015-02-10 10:45:23 AM */
!function(){"use strict";angular.module("material.components.tabs",["material.core"])}(),function(){"use strict";function a(a,b,c,d){function e(b,c,e,f){function g(){var e=j.selected(),f=!e||j.count()<2||1===(b.pagination||{}).itemsPerPage;if(c.css("display",f?"none":"block"),!f){var g=j.count(),i=1/g,k=j.indexOf(e);c.css(a.CSS.TRANSFORM,"scaleX("+i+") translate3d("+100*k+"%,0,0)"),c.addClass("md-ink-bar-grow"),h&&d.cancel(h),h=d(function(){c.removeClass("md-ink-bar-grow")},250,!1)}}var h,i=f[0],j=f[1];i||(j.inkBarElement=c,b.$watch(j.selected,g),b.$on("$mdTabsChanged",g))}return{restrict:"E",require:["^?mdNoBar","^mdTabs"],link:e}}angular.module("material.components.tabs").directive("mdTabsInkBar",a),a.$inject=["$mdConstant","$window","$$rAF","$timeout"]}(),function(){"use strict";function a(a,b,c,d,e){function f(f,i,j,k){function l(a,b){if(a){var c=q(a);t.active&&c!==t.page?(b&&b.element.blur(),r(c).then(function(){a.element.focus()})):a.element.focus()}}function m(a){if(a)if(t.active){var b=q(a);r(b)}else u()}function n(a){var b,c=t.page+a;if(!k.selected()||q(k.selected())!==c){var d;0>a?(d=(c+1)*t.itemsPerPage,b=k.previous(k.itemAt(d))):(d=c*t.itemsPerPage-1,b=k.next(k.itemAt(d)))}r(c).then(function(){b&&b.element.focus()}),b&&k.select(b)}function o(){var a=i.find("md-tab"),b=i.parent().prop("clientWidth")-h,c=b&&g*k.count()>b,d=c!==t.active;if(0>=b&&(c=!1,d=!0),t.active=c,c){t.pagesCount=Math.ceil(g*k.count()/b),t.itemsPerPage=Math.max(1,Math.floor(k.count()/t.pagesCount)),t.tabWidth=b/t.itemsPerPage,s.css("width",t.tabWidth*k.count()+"px"),a.css("width",t.tabWidth+"px");var f=q(k.selected());r(f)}else d&&e(function(){s.css("width",""),a.css("width",""),p(0),t.page=-1})}function p(b){function c(b){b.target===s[0]&&(s.off(a.CSS.TRANSITIONEND,c),e.resolve())}if(k.pagingOffset===b)return d.when();var e=d.defer();return k.$$pagingOffset=b,s.css(a.CSS.TRANSFORM,"translate3d("+b+"px,0,0)"),s.on(a.CSS.TRANSITIONEND,c),e.promise}function q(a){var b=k.indexOf(a);return-1===b?0:Math.floor(b/t.itemsPerPage)}function r(a){if(a!==t.page){var b=t.pagesCount;return 0>a&&(a=0),a>b&&(a=b),t.hasPrev=a>0,t.hasNext=(a+1)*t.itemsPerPage<k.count(),t.page=a,e(function(){f.$broadcast("$mdTabsPaginationChanged")}),p(-a*t.itemsPerPage*t.tabWidth)}}var s=i.children(),t=f.pagination={page:-1,active:!1,clickNext:function(){n(1)},clickPrevious:function(){n(-1)}};o();var u=c.debounce(o);f.$on("$mdTabsChanged",u),angular.element(b).on("resize",u),f.$on("$destroy",function(){angular.element(b).off("resize",u)}),f.$watch(k.selected,m),f.$watch(function(){return k.tabToFocus},l)}var g=96,h=64;return{restrict:"A",require:"^mdTabs",link:f}}angular.module("material.components.tabs").directive("mdTabsPagination",a),a.$inject=["$mdConstant","$window","$$rAF","$$q","$timeout"]}(),function(){"use strict";function a(a,b,c,d,e,f,g){function h(){return n(a.$parent)}function i(b){m.content.length&&(m.contentContainer.append(m.content),m.contentScope=a.$parent.$new(),b.append(m.contentContainer),d(m.contentContainer)(m.contentScope),f.disconnectScope(m.contentScope))}function j(){m.hammertime.destroy(),e.leave(m.contentContainer).then(function(){m.contentScope&&m.contentScope.$destroy(),m.contentScope=null})}function k(){f.reconnectScope(m.contentScope),m.hammertime.on("swipeleft swiperight",a.onSwipe),b.addClass("active"),b.attr("aria-selected",!0),b.attr("tabIndex",0),e.removeClass(m.contentContainer,"ng-hide"),a.onSelect()}function l(){f.disconnectScope(m.contentScope),m.hammertime.off("swipeleft swiperight",a.onSwipe),b.removeClass("active"),b.attr("aria-selected",!1),b.attr("tabIndex",-1),e.addClass(m.contentContainer,"ng-hide"),a.onDeselect()}var m=this;m.contentContainer=angular.element('<div class="md-tab-content ng-hide">'),m.hammertime=new Hammer(m.contentContainer[0]),m.element=b,m.isDisabled=h,m.onAdd=i,m.onRemove=j,m.onSelect=k,m.onDeselect=l;var n=g(c.ngDisabled)}angular.module("material.components.tabs").controller("$mdTab",a),a.$inject=["$scope","$element","$attrs","$compile","$animate","$mdUtil","$parse"]}(),function(){"use strict";function a(a,b,c,d,e){function f(c,f){var g=c.find("md-tab-label");g.length?g.remove():g=angular.isDefined(f.label)?angular.element("<md-tab-label>").html(f.label):angular.element("<md-tab-label>").append(c.contents().remove());var h=c.contents().remove();return function(c,f,i,j){function k(){var a=g.clone();f.append(a),b(a)(c.$parent),s.content=h.clone()}function l(){c.$apply(function(){t.select(s),t.focus(s)})}function m(a){a.keyCode==e.KEY_CODE.SPACE||a.keyCode==e.KEY_CODE.ENTER?(f.triggerHandler("click"),a.preventDefault()):a.keyCode===e.KEY_CODE.LEFT_ARROW?c.$evalAsync(function(){t.focus(t.previous(s))}):a.keyCode===e.KEY_CODE.RIGHT_ARROW&&c.$evalAsync(function(){t.focus(t.next(s))})}function n(a){c.$apply(function(){t.select("swipeleft"===a.type?t.next():t.previous())})}function o(){c.$watch("$parent.$index",function(a){t.move(s,a)})}function p(){function a(a){var b=t.selected()===s;a&&!b?t.select(s):!a&&b&&t.deselect(s)}var b=c.$parent.$watch("!!("+i.mdActive+")",a);c.$on("$destroy",b)}function q(){function a(a){f.attr("aria-disabled",a);var b=t.selected()===s;b&&a&&t.select(t.next()||t.previous())}c.$watch(s.isDisabled,a)}function r(){var a=i.id||"tab_"+d.nextUid();if(f.attr({id:a,role:"tab",tabIndex:-1}),h.length){var b="content_"+a;f.attr("aria-controls")||f.attr("aria-controls",b),s.contentContainer.attr({id:b,role:"tabpanel","aria-labelledby":a})}}var s=j[0],t=j[1];k(),r();var u=a.attachTabBehavior(c,f,{colorElement:t.inkBarElement});t.add(s),c.$on("$destroy",function(){u(),t.remove(s)}),angular.isDefined(i.ngClick)||f.on("click",l),f.on("keydown",m),c.onSwipe=n,angular.isNumber(c.$parent.$index)&&o(),angular.isDefined(i.mdActive)&&p(),q()}}return{restrict:"E",require:["mdTab","^mdTabs"],controller:"$mdTab",scope:{onSelect:"&mdOnSelect",onDeselect:"&mdOnDeselect",label:"@"},compile:f}}angular.module("material.components.tabs").directive("mdTab",a),a.$inject=["$mdInkRipple","$compile","$mdAria","$mdUtil","$mdConstant"]}(),function(){"use strict";function a(a,b,c){function d(){return o.itemAt(a.selectedIndex)}function e(b,c){n.add(b,c),b.onAdd(o.contentArea),-1!==a.selectedIndex&&angular.isNumber(a.selectedIndex)&&a.selectedIndex!==o.indexOf(b)||o.select(b),a.$broadcast("$mdTabsChanged")}function f(b,c){n.contains(b)&&(c||o.selected()===b&&(n.count()>1?o.select(o.previous()||o.next()):o.deselect(b)),n.remove(b),b.onRemove(),a.$broadcast("$mdTabsChanged"))}function g(b,c){var d=o.selected()===b;n.remove(b),n.add(b,c),d&&o.select(b),a.$broadcast("$mdTabsChanged")}function h(b){!b||b.isSelected||b.isDisabled()||n.contains(b)&&(o.deselect(o.selected()),a.selectedIndex=o.indexOf(b),b.isSelected=!0,b.onSelect())}function i(a){o.tabToFocus=a}function j(b){b&&b.isSelected&&n.contains(b)&&(a.selectedIndex=-1,b.isSelected=!1,b.onDeselect())}function k(a,b){return n.next(a||o.selected(),b||m)}function l(a,b){return n.previous(a||o.selected(),b||m)}function m(a){return a&&!a.isDisabled()}var n=c.iterator([],!1),o=this;o.$element=b,o.scope=a,o.contentArea=angular.element(b[0].querySelector(".md-tabs-content")),o.inRange=n.inRange,o.indexOf=n.indexOf,o.itemAt=n.itemAt,o.count=n.count,o.selected=d,o.add=e,o.remove=f,o.move=g,o.select=h,o.focus=i,o.deselect=j,o.next=k,o.previous=l,a.$on("$destroy",function(){o.deselect(o.selected());for(var a=n.count()-1;a>=0;a--)o.remove(n[a],!0)})}angular.module("material.components.tabs").controller("$mdTabs",a),a.$inject=["$scope","$element","$mdUtil"]}(),function(){"use strict";function a(a,b){function c(a,c,d,e,f){function g(){c.attr({role:"tablist"})}function h(){a.$watch("selectedIndex",function(a,b){if(e.deselect(e.itemAt(b)),e.inRange(a)){var c=e.itemAt(a);c&&c.isDisabled()&&(c=a>b?e.next(c):e.previous(c)),e.select(c)}})}b(c),g(),h(),f(a.$parent,function(a){angular.element(c[0].querySelector(".md-header-items")).append(a)})}return{restrict:"E",controller:"$mdTabs",require:"mdTabs",transclude:!0,scope:{selectedIndex:"=?mdSelected"},template:'<section class="md-header" ng-class="{\'md-paginating\': pagination.active}"><button class="md-paginator md-prev" ng-if="pagination.active && pagination.hasPrev" ng-click="pagination.clickPrevious()" aria-hidden="true"></button><div class="md-header-items-container" md-tabs-pagination><div class="md-header-items"><md-tabs-ink-bar></md-tabs-ink-bar><md-tabs-ink-bar class="md-ink-bar-delayed"></md-tabs-ink-bar></div></div><button class="md-paginator md-next" ng-if="pagination.active && pagination.hasNext" ng-click="pagination.clickNext()" aria-hidden="true"></button></section><section class="md-tabs-content"></section>',link:c}}angular.module("material.components.tabs").directive("mdTabs",a),a.$inject=["$parse","$mdTheming"]}();