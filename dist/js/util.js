/*! ppz_website 2014-12-05 1:29:50 PM */
!function(){angular.module("ppzUtils",[]).service("utilService",function(){return{setPropertyValue:function(a,b,c){var d,e=b.split(".");e.forEach(function(b,c){c<e.length-1&&(a=a[b])}),d=e.pop(),a[d]=c}}})}();