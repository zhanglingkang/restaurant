/*! ppz_website 2015-02-10 10:45:23 AM */
"use strict";define("print-number/controller",["app"],function(a){var b=a("app");b.controller("printNumberController",["$scope","$window","$rootScope","$timeout",function(a,b,c,d){c.excludeHeader=!0,c.disableReservationHint=!0,a.partyTypeDescription=b.printPartyTypeDescription,a.unitId=b.printUnitId,d(function(){window.print()},.5)}])});