/*! ppz_website 2015-01-27 4:24:49 PM */
"use strict";define("public/general/directive/full-tr",["app"],function(a){var b=a("app");b.directive("fullTr",function(){return{restrict:"A",link:function(a,b){var c=$(b),d=c.parents("table").find("thead tr:nth-child(1)").find(">td,>th");0===d.length&&(d=c.parents("table").find("tr:nth-child(1)").find(">td,>th"));var e=0;d.each(function(a,b){e+=parseInt($(b).attr("colspan")||1)}),c.attr("colspan",e)}}})});