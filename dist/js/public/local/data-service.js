/*! ppz_website 2015-01-12 6:55:00 PM */
"use strict";define(function(a){var b=a("app"),c=[function(){var a={reservationStatus:{waitConfirm:1,accept:2,refuse:3}},b={getText:function(a){var b;return util.getArray(this).some(function(c){return c.value===a?(b=c.text,!0):void 0}),b}};return angular.forEach(a,function(a){a.__proto__=b}),a}];b.service("dataService",c)});