/*! ppz_website 2015-02-03 11:00:22 AM */
"use strict";define("public/general/directive/alert",["app","public/local/system"],function(a){var b=a("app"),c=a("public/local/system");b.directive("selfAlert",["$timeout",function(a){return{restrict:"E",replace:!0,transclude:!0,scope:{show:"=",showType:"=",noAutoHide:"="},templateUrl:c.getTplAbsolutePath("tpl/directive/alert.html"),link:function(b,c,d){var e=($(c),parseInt(d.showTime||0));b.hideAlert=function(){b.show=!1},b.$watch("show",function(){b.show&&!b.noAutoHide&&a(function(){b.show=!1},e||5e3)})}}}])});