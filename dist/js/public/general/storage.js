/*! ppz_website 2015-02-03 11:00:22 AM */
"use strict";define("public/general/storage",[],function(){return{store:function(a,b){var c=JSON.stringify(b);sessionStorage.setItem(a,c)},remove:function(a){sessionStorage.removeItem(a)},has:function(a){return!!sessionStorage.getItem(a)},get:function(a){var b=sessionStorage.getItem(a);return JSON.parse(b)}}});