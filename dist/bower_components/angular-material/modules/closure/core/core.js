/*! ppz_website 2015-02-05 3:57:11 PM */
goog.provide("ng.material.core"),function(){"use strict";function a(){if("undefined"==typeof Hammer)throw new Error("ngMaterial requires HammerJS to be preloaded.")}function b(a){function b(a){return a.debounce=function(b){var c,d,e,f;return function(){c=arguments,f=this,e=b,d||(d=!0,a(function(){e.apply(f,c),d=!1}))}},a}a.decorator("$$rAF",["$delegate","$rootScope",b])}angular.module("material.core",[]).run(a).config(b),b.$inject=["$provide"]}(),function(){"use strict";function a(a,b){function c(a){return d?"webkit"+a.charAt(0).toUpperCase()+a.substring(1):a}var d=/webkit/i.test(b.vendorPrefix);return{KEY_CODE:{ENTER:13,ESCAPE:27,SPACE:32,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40},CSS:{TRANSITIONEND:"transitionend"+(d?" webkitTransitionEnd":""),ANIMATIONEND:"animationend"+(d?" webkitAnimationEnd":""),TRANSFORM:c("transform"),TRANSITION:c("transition"),TRANSITION_DURATION:c("transitionDuration"),ANIMATION_PLAY_STATE:c("animationPlayState"),ANIMATION_DURATION:c("animationDuration"),ANIMATION_NAME:c("animationName"),ANIMATION_TIMING:c("animationTimingFunction"),ANIMATION_DIRECTION:c("animationDirection")},MEDIA:{sm:"(max-width: 600px)","gt-sm":"(min-width: 600px)",md:"(min-width: 600px) and (max-width: 960px)","gt-md":"(min-width: 960px)",lg:"(min-width: 960px) and (max-width: 1200px)","gt-lg":"(min-width: 1200px)"}}}angular.module("material.core").factory("$mdConstant",a),a.$inject=["$$rAF","$sniffer"]}(),function(){"use strict";var a=["0","0","0"];angular.module("material.core").factory("$mdUtil",["$cacheFactory",function(b){function c(a,b){function c(){return[].concat(s)}function d(){return s.length}function e(a){return s.length&&a>-1&&a<s.length}function f(a){return a?e(l(a)+1):!1}function g(a){return a?e(l(a)-1):!1}function h(a){return e(a)?s[a]:null}function i(a,b){return s.filter(function(c){return c[a]===b})}function j(a,b){return a?(angular.isNumber(b)||(b=s.length),s.splice(b,0,a),l(a)):-1}function k(a){m(a)&&s.splice(l(a),1)}function l(a){return s.indexOf(a)}function m(a){return a&&l(a)>-1}function n(a,c){if(c=c||r,m(a)){var d=l(a)+1,f=e(d)?s[d]:b?p():null;return c(f)?f:n(f,c)}return null}function o(a,c){if(c=c||r,m(a)){var d=l(a)-1,f=e(d)?s[d]:b?q():null;return c(f)?f:o(f,c)}return null}function p(){return s.length?s[0]:null}function q(){return s.length?s[s.length-1]:null}var r=function(){return!0};b=!!b;var s=a||[];return{items:c,count:d,inRange:e,contains:m,indexOf:l,itemAt:h,findBy:i,add:j,remove:k,first:p,last:q,next:n,previous:o,hasPrevious:g,hasNext:f}}function d(a,c){var d=b(a,c),e={};return d._put=d.put,d.put=function(a,b){return e[a]=!0,d._put(a,b)},d._remove=d.remove,d.remove=function(a){return delete e[a],d._remove(a)},d.keys=function(){return Object.keys(e)},d}var e;return e={now:window.performance?angular.bind(window.performance,window.performance.now):Date.now,iterator:c,cacheFactory:d,debounce:function(a,b,c){var d;return function(){var e=this,f=arguments;clearTimeout(d),d=setTimeout(function(){d=null,c||a.apply(e,f)},b),c&&!d&&a.apply(e,f)}},throttle:function(a,b){var c;return function(){var d=this,f=arguments,g=e.now();(!c||c-g>b)&&(a.apply(d,f),c=g)}},nextUid:function(){for(var b,c=a.length;c;){if(c--,b=a[c].charCodeAt(0),57==b)return a[c]="A",a.join("");if(90!=b)return a[c]=String.fromCharCode(b+1),a.join("");a[c]="0"}return a.unshift("0"),a.join("")},disconnectScope:function(a){if(a&&a.$root!==a&&!a.$$destroyed){var b=a.$parent;a.$$disconnected=!0,b.$$childHead===a&&(b.$$childHead=a.$$nextSibling),b.$$childTail===a&&(b.$$childTail=a.$$prevSibling),a.$$prevSibling&&(a.$$prevSibling.$$nextSibling=a.$$nextSibling),a.$$nextSibling&&(a.$$nextSibling.$$prevSibling=a.$$prevSibling),a.$$nextSibling=a.$$prevSibling=null}},reconnectScope:function(a){if(a&&a.$root!==a&&a.$$disconnected){var b=a,c=b.$parent;b.$$disconnected=!1,b.$$prevSibling=c.$$childTail,c.$$childHead?(c.$$childTail.$$nextSibling=b,c.$$childTail=b):c.$$childHead=c.$$childTail=b}}}}]),angular.element.prototype.focus=angular.element.prototype.focus||function(){return this.length&&this[0].focus(),this},angular.element.prototype.blur=angular.element.prototype.blur||function(){return this.length&&this[0].blur(),this}}(),function(){"use strict";function a(a,b,c){function d(a,c,d){var e=a[0];e.hasAttribute(c)||g(e,c)||(d=angular.isString(d)&&d.trim()||"",d.length?a.attr(c,d):b.warn('ARIA: Attribute "',c,'", required for accessibility, is missing on node:',e))}function e(b,c,e){a(function(){d(b,c,e())})}function f(a,b){e(a,b,function(){return a.text().trim()})}function g(a,b){function d(a){var b=a.currentStyle?a.currentStyle:c.getComputedStyle(a);return"none"===b.display}var e=a.hasChildNodes(),f=!1;if(e)for(var g=a.childNodes,h=0;h<g.length;h++){var i=g[h];1===i.nodeType&&i.hasAttribute(b)&&(d(i)||(f=!0))}return f}return{expect:d,expectAsync:e,expectWithText:f}}angular.module("material.core").service("$mdAria",a),a.$inject=["$$rAF","$log","$window"]}(),function(){"use strict";function a(a,b,c,d,e,f){this.compile=function(g){var h=g.templateUrl,i=g.template||"",j=g.controller,k=g.controllerAs,l=g.resolve||{},m=g.locals||{},n=g.transformTemplate||angular.identity,o=g.bindToController;return angular.forEach(l,function(a,b){l[b]=angular.isString(a)?c.get(a):c.invoke(a)}),angular.extend(l,m),l.$template=h?b.get(h,{cache:f}).then(function(a){return a.data}):a.when(i),a.all(l).then(function(a){var b=n(a.$template),c=angular.element("<div>").html(b.trim()).contents(),f=d(c);return{locals:a,element:c,link:function(b){if(a.$scope=b,j){var d=e(j,a);o&&angular.extend(d,a),c.data("$ngControllerController",d),c.children().data("$ngControllerController",d),k&&(b[k]=d)}return f(b)}}})}}angular.module("material.core").service("$mdCompiler",a),a.$inject=["$q","$http","$injector","$compile","$controller","$templateCache"]}(),function(){"use strict";function a(){function a(a){function b(a){return f.optionsFactory=a.options,f.methods=(a.methods||[]).concat(e),g}function c(b,c){if(c=c||{},c.methods=c.methods||[],c.options=c.options||function(){return{}},/^cancel|hide|show$/.test(b))throw new Error("Preset '"+b+"' in "+a+" is reserved!");if(c.methods.indexOf("_options")>-1)throw new Error("Method '_options' in "+a+" is reserved!");return f.presets[b]={methods:c.methods.concat(e),optionsFactory:c.options,argOption:c.argOption},g}function d(b,c,d){function e(a){return a&&a._options&&(a=a._options),j.show(angular.extend({},i,a))}function g(b,c){var e={};return e[a]=k,d.invoke(b||function(){return c},{},e)}var h,i,j=b(),k={hide:j.hide,cancel:j.cancel,show:e};return h=f.methods||[],i=g(f.optionsFactory,{}),angular.forEach(f.presets,function(a,b){function c(a){this._options=angular.extend({},d,a)}var d=g(a.optionsFactory,{}),e=(a.methods||[]).concat(h);angular.extend(d,{$type:b}),angular.forEach(e,function(a){c.prototype[a]=function(b){return this._options[a]=b,this}}),k[b]=function(b){return arguments.length&&a.argOption&&!angular.isObject(b)&&!angular.isArray(b)?(new c)[a.argOption](b):new c(b)}}),k}var e=["onHide","onShow","onRemove"],f={presets:{}},g={setDefaults:b,addPreset:c,$get:d};return g.addPreset("build",{methods:["controller","controllerAs","resolve","template","templateUrl","themable","transformTemplate","parent"]}),d.$inject=["$$interimElement","$animate","$injector"],g}function b(a,b,c,d,e,f,g,h){return function(){function i(a){n.length&&m.cancel();var b=new l(a);return n.push(b),b.show().then(function(){return b.deferred.promise})}function j(a){var c=n.shift();return c&&c.remove().then(function(){c.deferred.resolve(a)}),c?c.deferred.promise:b.when(a)}function k(a){var c=n.shift();return c&&c.remove().then(function(){c.deferred.reject(a)}),c?c.deferred.promise:b.reject(a)}function l(i){var j,k,l;return i=i||{},i=angular.extend({scope:i.scope||c.$new(i.isolateScope),onShow:function(a,b,c){return f.enter(b,c.parent)},onRemove:function(a,c){return c&&f.leave(c)||b.when()}},i),j={options:i,deferred:b.defer(),show:function(){return g.compile(i).then(function(c){function f(){i.hideDelay&&(k=d(m.cancel,i.hideDelay))}angular.extend(c.locals,j.options),angular.isString(i.parent)?i.parent=angular.element(a[0].querySelector(i.parent)):i.parent||(i.parent=e.find("body"),i.parent.length||(i.parent=e)),l=c.link(i.scope),i.themable&&h(l);var g=i.onShow(i.scope,l,i);return b.when(g).then(function(){(i.onComplete||angular.noop)(i.scope,l,i),f()})})},cancelTimeout:function(){k&&(d.cancel(k),k=void 0)},remove:function(){j.cancelTimeout();var a=i.onRemove(i.scope,l,i);return b.when(a).then(function(){i.scope.$destroy()})}}}var m,n=[];return m={show:i,hide:j,cancel:k}}}return a.$get=b,b.$inject=["$document","$q","$rootScope","$timeout","$rootElement","$animate","$mdCompiler","$mdTheming"],a}angular.module("material.core").provider("$$interimElement",a)}(),function(){"use strict";function a(a){return{controller:angular.noop,link:function(b,c,d){d.hasOwnProperty("mdInkRippleCheckbox")?a.attachCheckboxBehavior(b,c):a.attachButtonBehavior(b,c)}}}function b(a,b){function c(a,b,c){return f(a,b,angular.extend({isFAB:b.hasClass("md-fab"),isMenuItem:b.hasClass("md-menu-item"),center:!1,dimBackground:!0},c))}function d(a,b,c){return f(a,b,angular.extend({center:!0,dimBackground:!1},c))}function e(a,b,c){return f(a,b,angular.extend({center:!1,dimBackground:!0,outline:!0},c))}function f(c,d,e){function f(a){function b(a){var b="#"===a.charAt(0)?a.substr(1):a,c=b.length/3,d=b.substr(0,c),e=b.substr(c,c),f=b.substr(2*c);return 1===c&&(d+=d,e+=e,f+=f),"rgba("+parseInt(d,16)+","+parseInt(e,16)+","+parseInt(f,16)+",0.1)"}function c(a){return a.replace(")",", 0.1)").replace("(","a(")}if(a)return 0===a.indexOf("rgba")?a:0===a.indexOf("rgb")?c(a):0===a.indexOf("#")?b(a):void 0}function g(a,c){o.splice(o.indexOf(a),1),0===o.length&&k&&k.css({backgroundColor:""}),b(function(){a.remove()},c,!1)}function h(a){var b=o.indexOf(a),c=p[b]||{},d=o.length>1?!1:r,f=o.length>1?!1:s;d||c.animating||f?a.addClass("md-ripple-visible"):a&&(a.removeClass("md-ripple-visible"),e.outline&&a.css({width:l+"px",height:l+"px",marginLeft:-1*l+"px",marginTop:-1*l+"px"}),g(a,e.outline?450:650))}function i(c,g){function i(a){var b=angular.element('<div class="md-ripple" data-counter="'+n++ +'">');return o.unshift(b),p.unshift({animating:!0}),r.append(b),a&&b.css(a),b}function j(a,b){var c,d,f,g=r.prop("offsetWidth"),h=r.prop("offsetHeight");return e.isMenuItem?d=Math.sqrt(Math.pow(g,2)+Math.pow(h,2)):e.outline?(f=t.getBoundingClientRect(),a-=f.left,b-=f.top,g=Math.max(a,g-a),h=Math.max(b,h-b),d=2*Math.sqrt(Math.pow(g,2)+Math.pow(h,2))):(c=e.isFAB?1.1:.8,d=Math.max(g,h)*c),d}function m(a,b,c){function d(a){return a.replace("rgba","rgb").replace(/,[^\)\,]+\)/,")")}var f,g={backgroundColor:d(v),borderColor:d(v),width:a+"px",height:a+"px"};return e.outline?(g.width=0,g.height=0):g.marginLeft=g.marginTop=a*-.5+"px",e.center?g.left=g.top="50%":(f=t.getBoundingClientRect(),g.left=Math.round((b-f.left)/r.prop("offsetWidth")*100)+"%",g.top=Math.round((c-f.top)/r.prop("offsetHeight")*100)+"%"),g}function q(){if(k)return k;var a=k=angular.element('<div class="md-ripple-container">');return d.append(a),a}v=f(d.attr("md-ink-ripple"))||f(a.getComputedStyle(e.colorElement[0]).color||"rgb(0, 0, 0)");var r=q(),s=j(c,g),u=m(s,c,g),w=i(u),x=o.indexOf(w),y=p[x]||{};return l=s,y.animating=!0,b(function(){e.dimBackground&&r.css({backgroundColor:v}),w.addClass("md-ripple-placed md-ripple-scaled"),w.css(e.outline?{borderWidth:.5*s+"px",marginLeft:s*-.5+"px",marginTop:s*-.5+"px"}:{left:"50%",top:"50%"}),h(w),b(function(){y.animating=!1,h(w)},e.outline?450:225,!1)},0,!1),w}function j(a){function c(){var a=t.parentNode;return!(t.hasAttribute("disabled")||a&&a.hasAttribute("disabled"))}var d,e;a.eventType===Hammer.INPUT_START&&a.isFirst&&c()?(d=i(a.center.x,a.center.y),s=!0):a.eventType===Hammer.INPUT_END&&a.isFinal&&(s=!1,e=o.length-1,d=o[e],b(function(){h(d)},0,!1))}if(d.controller("mdNoInk"))return angular.noop;e=angular.extend({colorElement:d,mousedown:!0,hover:!0,focus:!0,center:!1,mousedownPauseTime:150,dimBackground:!1,outline:!1,isFAB:!1,isMenuItem:!1},e);var k,l,m=d.controller("mdInkRipple")||{},n=0,o=[],p=[],q=d.attr("md-highlight"),r=!1,s=!1,t=d[0],u=new Hammer(t),v=f(d.attr("md-ink-ripple"))||f(a.getComputedStyle(e.colorElement[0]).color||"rgb(0, 0, 0)");return e.mousedown&&u.on("hammer.input",j),m.createRipple=i,q&&c.$watch(q,function(a){r=a,r&&!o.length&&b(function(){i(0,0)},0,!1),angular.forEach(o,h)}),function(){u.destroy(),k&&k.remove()}}return{attachButtonBehavior:c,attachCheckboxBehavior:d,attachTabBehavior:e,attach:f}}function c(){return function(){return{controller:angular.noop}}}angular.module("material.core").factory("$mdInkRipple",b).directive("mdInkRipple",a).directive("mdNoInk",c()).directive("mdNoBar",c()).directive("mdNoStretch",c()),a.$inject=["$mdInkRipple"],b.$inject=["$window","$timeout"]}(),function(){"use strict";function a(){function a(a){function d(b,c){void 0===c&&(c=b,b=void 0),void 0===b&&(b=a),d.inherit(c,c)}return d.inherit=function(d,e){function f(a){var b=d.data("$mdThemeName");b&&d.removeClass("md-"+b+"-theme"),d.addClass("md-"+a+"-theme"),d.data("$mdThemeName",a)}var g=e.controller("mdTheme"),h=d.attr("md-theme-watch");if((c||angular.isDefined(h))&&"false"!=h){var i=a.$watch(function(){return g&&g.$mdTheme||b},f);d.on("$destroy",i)}else{var j=g&&g.$mdTheme||b;f(j)}},d}var b="default",c=!1;return{setDefaultTheme:function(a){b=a},alwaysWatchTheme:function(a){c=a},$get:["$rootScope",a]}}function b(a){return{priority:100,link:{pre:function(b,c,d){var e={$setTheme:function(a){e.$mdTheme=a}};c.data("$mdThemeController",e),e.$setTheme(a(d.mdTheme)(b)),d.$observe("mdTheme",e.$setTheme)}}}}function c(a){return a}angular.module("material.core").directive("mdTheme",b).directive("mdThemable",c).provider("$mdTheming",a),b.$inject=["$interpolate"],c.$inject=["$mdTheming"]}();