/*! ppz_website 2015-01-12 6:59:27 PM */
"use strict";define(function(a){var b=a("app");b.controller("printNumberController",["$scope","$window","$rootScope","$timeout",function(a,b,c,d){c.excludeHeader=!0,c.disableReservationHint=!0,a.partyTypeDescription=b.printPartyTypeDescription,a.unitId=b.printUnitId,d(function(){window.print()},.5)}])});