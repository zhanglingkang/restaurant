/*! ppz_website 2015-01-12 6:59:27 PM */
!function(){angular.module("ppzUtils",[]).service("util",function(){return{getArray:function(a){var b=[];return angular.forEach(a,function(a){b.push(a)}),b},serialize:function(a){var b="",c="";a=a||{};for(var d in a)a.hasOwnProperty(d)&&(b?c="&":b="",b+=c+d+"="+a[d]);return b},getUrl:function(a,b){var c=this.serialize(b);return c&&(-1===a.indexOf("?")&&(a+="?"),"?"!=a.charAt(a.length-1)&&(a+="&"),a+=c),a},clone:function(a){return JSON.parse(JSON.stringify(a))},setPropertyValue:function(a,b,c){var d,e=b.split(".");e.forEach(function(b,c){c<e.length-1&&(a=a[b])}),d=e.pop(),a[d]=c},getPropertyValue:function(a,b){var c,d=b.split(".");return d.forEach(function(b,c){c<d.length-1&&(a=a[b])}),c=d.pop(),a[c]}}})}();