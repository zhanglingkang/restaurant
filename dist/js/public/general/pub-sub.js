/*! ppz_website 2015-02-03 11:00:22 AM */
"use strict";define("public/general/pub-sub",[],function(){var a={},b={};return{publish:function(c,d){a[c]=d,b[c]=b[c]||[],b[c].forEach(function(a){a(d)})},subscribe:function(a,c){b[a]=b[a]||[],b[a].push(c)},unSubscribe:function(a,c){b[a]=b[a]||[],b[a]=b[a].filter(function(a){return a!==c})}}});