/*! ppz_website 2015-01-12 6:55:00 PM */
"use strict";define(function(){var a={},b={};return{publish:function(c,d){a[c]=d,b[c]=b[c]||[],b[c].forEach(function(a){a(d)})},subscribe:function(a,c){b[a]=b[a]||[],b[a].push(c)},unSubscribe:function(a,c){b[a]=b[a]||[],b[a]=b[a].filter(function(a){return a!==c})}}});