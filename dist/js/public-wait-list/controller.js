/*! ppz_website 2015-01-12 6:55:00 PM */
"use strict";define(function(a){var b=a("app");b.controller("publicWaitListController",["$rootScope","$scope","$timeout","$window",function(a,b,c,d){function e(a){a=a||d.data,angular.forEach(a,function(a,c){b[c]=a})}d.addEventListener("message",function(a){var d=a.data.data;switch(a.data.type){case"initData":e(d);break;case"call":b.lastCalledNumbers[d.unitIdPrefix]=d.unit.unitId,b.panelTypes[d.unitIdPrefix]="panel-primary animate-flicker",c(function(){b.panelTypes[d.unitIdPrefix]="panel-primary"},1e4)}b.$apply()}),e(),a.excludeHeader=!0,a.disableReservationHint=!0,b.panelTypes={};for(var f=0;f<b.partyTypes.length;f++){var g=b.partyTypes[f];b.panelTypes[g.unitIdPrefix]="panel-info"}console.log(JSON.stringify(b.lastCalledNumbers))}])});