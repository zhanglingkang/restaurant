/*! ppz_website 2015-03-20 5:16:00 PM */
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.returnExports=b()}(this,function(){function a(a){try{return a.sentinel=0,0===Object.getOwnPropertyDescriptor(a,"sentinel").value}catch(b){}}function b(a){try{return Object.defineProperty(a,"sentinel",{}),"sentinel"in a}catch(b){}}var c,d,e,f,g=Function.prototype.call,h=Object.prototype,i=g.bind(h.hasOwnProperty),j=i(h,"__defineGetter__");if(j&&(c=g.bind(h.__defineGetter__),d=g.bind(h.__defineSetter__),e=g.bind(h.__lookupGetter__),f=g.bind(h.__lookupSetter__)),Object.getPrototypeOf||(Object.getPrototypeOf=function(a){var b=a.__proto__;return b||null===b?b:a.constructor?a.constructor.prototype:h}),Object.defineProperty){var k=a({}),l="undefined"==typeof document||a(document.createElement("div"));if(!l||!k)var m=Object.getOwnPropertyDescriptor}if(!Object.getOwnPropertyDescriptor||m){var n="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function(a,b){if("object"!=typeof a&&"function"!=typeof a||null===a)throw new TypeError(n+a);if(m)try{return m.call(Object,a,b)}catch(c){}if(i(a,b)){var d={enumerable:!0,configurable:!0};if(j){var g=a.__proto__,k=a!==h;k&&(a.__proto__=h);var l=e(a,b),o=f(a,b);if(k&&(a.__proto__=g),l||o)return l&&(d.get=l),o&&(d.set=o),d}return d.value=a[b],d.writable=!0,d}}}if(Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(a){return Object.keys(a)}),!Object.create){var o,p=!({__proto__:null}instanceof Object);o=p||"undefined"==typeof document?function(){return{__proto__:null}}:function(){function a(){}var b=document.createElement("iframe"),c=document.body||document.documentElement;b.style.display="none",c.appendChild(b),b.src="javascript:";var d=b.contentWindow.Object.prototype;return c.removeChild(b),b=null,delete d.constructor,delete d.hasOwnProperty,delete d.propertyIsEnumerable,delete d.isPrototypeOf,delete d.toLocaleString,delete d.toString,delete d.valueOf,d.__proto__=null,a.prototype=d,o=function(){return new a},new a},Object.create=function(a,b){function c(){}var d;if(null===a)d=o();else{if("object"!=typeof a&&"function"!=typeof a)throw new TypeError("Object prototype may only be an Object or null");c.prototype=a,d=new c,d.__proto__=a}return void 0!==b&&Object.defineProperties(d,b),d}}if(Object.defineProperty){var q=b({}),r="undefined"==typeof document||b(document.createElement("div"));if(!q||!r)var s=Object.defineProperty,t=Object.defineProperties}if(!Object.defineProperty||s){var u="Property description must be an object: ",v="Object.defineProperty called on non-object: ",w="getters & setters can not be defined on this javascript engine";Object.defineProperty=function(a,b,g){if("object"!=typeof a&&"function"!=typeof a||null===a)throw new TypeError(v+a);if("object"!=typeof g&&"function"!=typeof g||null===g)throw new TypeError(u+g);if(s)try{return s.call(Object,a,b,g)}catch(k){}if(i(g,"value"))if(j&&(e(a,b)||f(a,b))){var l=a.__proto__;a.__proto__=h,delete a[b],a[b]=g.value,a.__proto__=l}else a[b]=g.value;else{if(!j)throw new TypeError(w);i(g,"get")&&c(a,b,g.get),i(g,"set")&&d(a,b,g.set)}return a}}(!Object.defineProperties||t)&&(Object.defineProperties=function(a,b){if(t)try{return t.call(Object,a,b)}catch(c){}for(var d in b)i(b,d)&&"__proto__"!==d&&Object.defineProperty(a,d,b[d]);return a}),Object.seal||(Object.seal=function(a){return a}),Object.freeze||(Object.freeze=function(a){return a});try{Object.freeze(function(){})}catch(x){Object.freeze=function(a){return function(b){return"function"==typeof b?b:a(b)}}(Object.freeze)}Object.preventExtensions||(Object.preventExtensions=function(a){return a}),Object.isSealed||(Object.isSealed=function(){return!1}),Object.isFrozen||(Object.isFrozen=function(){return!1}),Object.isExtensible||(Object.isExtensible=function(a){if(Object(a)!==a)throw new TypeError;for(var b="";i(a,b);)b+="?";a[b]=!0;var c=i(a,b);return delete a[b],c})});