/*! ppz_website 2015-02-10 10:45:23 AM */
"use strict";define("public/general/filter/width",["app"],function(a){var b=a("app");b.filter("width",function(){return function(a,b,c,d){c=c||" ",void 0===d&&(d=!0);var e=[];return a.length<b&&(e.length=b-a.length+1,a=d?a+e.join(c):e.join(c)+a),console.log(a,"char",c),a}})});