/*! ppz_website 2015-01-12 6:59:27 PM */
"use strict";define(function(a){var b=a("app");b.service("restaurantService",["$http","$window","$q","$cookies","httpService",function(a,b,c,d,e){var f;return{getMyRestaurantList:function(){return f||(f=e.post({command:"getManagingRestaurants"}),f.then(function(){},function(a){console.log("businessError:getManagingRestaurants: "+a),f=null})),f},resetWaitingList:function(a){return e.post({command:"resetWaitingList",data:{restaurantId:a}})},getRestaurant:function(a){var b=c.defer();return this.getMyRestaurantList().then(function(c){for(var d=0;d<c.results.length;++d)if(c.results[d].restaurantId===a){b.resolve(c.results[d]);break}d==c.results.length&&b.reject("没找到对应餐厅")},function(a){b.reject(a)}),b.promise},acceptReservation:function(a,b){return e.post({command:"modifyRestaurantInfo",data:{restaurantId:a,acceptReservation:b}})},enableQueue:function(a,b){return e.post({command:"modifyRestaurantInfo",data:{restaurantId:a,enableQueue:b}})},setMaxQueue:function(a,b){return e.post({command:"modifyRestaurantInfo",data:{restaurantId:a,maxQueueLength:b}})},updateRestaurantInfo:function(a,b){return e.post({command:"modifyRestaurantInfo",data:{restaurantId:a,"phone.number":b.phone.phone,email:b.email,website:b.website,restaurantDescription:b.restaurantDescription,"address.city":b.address.city,"address.location":b.address.location,"address.state":b.address.state,"address.street":b.address.street,"address.zipcode":b.address.zipcode}})},getWaitingList:function(a,b){return e.post({command:"allUnitInfo",data:{restaurantId:a}}).success(function(a){b(null,a.results[0])}).error(function(a){console.log("encounted error in queryRestaurantQueue: "+a),b(a)})}}}])});