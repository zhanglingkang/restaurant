/*! ppz_website 2015-02-10 10:45:23 AM */
"use strict";define("waiting-list/waiting-list-service",["app"],function(a){var b=a("app");b.factory("waitingListService",["$window","$cookies","httpService",function(a,b,c){return{lastCalledNumber:0,callUser:function(a,b){return this.lastCalledNumber=b,c.post({command:"callUser",data:{restaurantId:a,unitId:b}})},removeReservation:function(a,b){return c.post({command:"reservationToComplete",data:{restaurantId:a,unitId:b}})},removeWaiting:function(a,b){return c.post({command:"waitingToComplete",data:{restaurantId:a,unitId:b}})},addUser:function(a){return c.post({command:"addAdhocUserToQueue",data:a})},addWaitUser:function(a){return this.addUser(a)},addReservationUser:function(a){return a.reservationTime instanceof Date&&(a.reservationTime=Math.round(a.reservationTime.getTime()/1e3)),a.partyTypeId=parseInt(a.partyTypeId),this.addUser(a)}}}])});