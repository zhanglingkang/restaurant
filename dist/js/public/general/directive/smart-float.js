/*! ppz_website 2015-01-12 6:55:00 PM */
"use strict";define(function(a){var b=a("app"),c=/^\-?\d+((\.|\,)\d+)?$/;b.directive("smartFloat",function(){return{require:"ngModel",link:function(a,b,d,e){e.$parsers.unshift(function(a){return c.test(a)?(e.$setValidity("float",!0),parseFloat(a.replace(",","."))):void e.$setValidity("float",!1)})}}})});