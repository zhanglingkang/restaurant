/*! ppz_website 2015-01-27 5:27:15 PM */
"use strict";define("restaurant-detail/menu-service",["app"],function(a){var b=a("app");b.service("menuService",["$http","$window","$cookies","httpService",function(a,b,c,d){var e={};return{getMenu:function(a){return e[a]||(e[a]=d.post({command:"getRestaurantMenu",data:{restaurantId:a}}).error(function(b){console.log("encounted error in getRestaurantMenu: "+b),e[a]=null})),e[a]},importMenu:function(a,b){return d.post({url:d.MENU_IMPORT_URL,isForm:!0,data:{file:a,restaurantId:b},config:{transformRequest:angular.identity,headers:{"Content-Type":void 0}}})},addMenuCategory:function(a,b){return d.post({command:"createMenuCategory",data:angular.extend(a,{restaurantId:b})})},modifyMenuCategory:function(a,b){return d.post({command:"modifyMenuCategory",data:angular.extend(a,{restaurantId:b})})},removeMenuCategory:function(a,b){return d.post({command:"deleteMenuCategory",data:{restaurantId:b,categoryId:a}})},addMenuItem:function(a,b){return d.post({command:"createMenuItem",data:angular.extend(a,{restaurantId:b})})},modifyMenuItem:function(a,b){return d.post({command:"modifyMenuItem",data:angular.extend(a,{restaurantId:b})})},removeMenuItem:function(a,b){return d.post({command:"deleteMenuItem",data:angular.extend(a,{restaurantId:b})})},sortMenuCategory:function(a,b){return d.post({command:"pivotMenuCategory",data:angular.extend(a,{restaurantId:b})})},sortMenuItem:function(a,b){return d.post({command:"pivotMenuItem",data:angular.extend(a,{restaurantId:b})})}}}])});