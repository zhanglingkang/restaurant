/*! ppz_website 2015-03-20 5:16:00 PM */
"use strict";define("public/local/reservation-service",["app","public/general/util","public/general/pub-sub"],function(a){var b=a("app"),c=a("public/general/util"),d=a("public/general/pub-sub"),e=["httpService","$cookies","$mdBottomSheet",function(a,b){function e(a,b){var c={};return a.forEach(function(a){c[a.createTime]=a}),!!c[b.createTime]}function f(a,b){return a.createTime===b.createTime}var g,h={};return h.__proto__={addQueue:function(a,b){function c(a,b){b.forEach(function(b){e(a,b)?a.forEach(function(c,d){f(b,c)&&(a[d]=b)}):a.push(b)})}return h[a]?(c(h[a].reservationList,b.reservationList),angular.forEach(h[a].waitingList,function(d,e){c(h[a].waitingList[e],b.waitingList[e])}),void c(h[a].completeList,b.completeList)):void(h[a]=b)}},{connect:function(){g&&g.readyState!==EventSource.CLOSED||(g=new EventSource(c.getUrl("/bbqueue",{command:"pullQueueUnit",sessionId:b.token})),g.addEventListener("open",function(){console.log("open:"+new Date)}),g.addEventListener("error",function(){console.log("error:"+new Date)}),g.addEventListener("message",function(a){var b=JSON.parse(a.data);h.addQueue(b.restaurantId,b.queues),d.publish("newReservation",h),console.log("message:")}))},close:function(){g&&g.close()},getQueueMap:function(){return h},getQueue:function(a){return h[a]},accept:function(a){return this.acceptOrDeclineReservation(angular.extend({accept:!0},a))},refuse:function(a){return this.acceptOrDeclineReservation(angular.extend({accept:!1},a))},acceptOrDeclineReservation:function(b){return a.post({command:"acceptOrDeclineReservation",data:b})}}}];b.service("reservationService",e)});