/*! ppz_website 2015-02-02 10:07:15 AM */
"use strict";define("restaurant-detail/controller",["app","./menu-controller","public/general/util","public/general/directive/ng-model","./menu-service","./menu-category-controller","./menu-item-controller","public/general/directive/drag-sort","./review-list-controller","./review-service","./review-item-controller","./file-uploader-controller","./picture-service","./picture-item-controller","public/local/restaurant-service","public/general/directive/confirm-hint","public/general/directive/prevent-spread"],function(a){var b=a("app");a("./menu-controller"),a("./review-list-controller"),a("./review-item-controller"),a("./file-uploader-controller"),a("./menu-service"),a("public/local/restaurant-service"),a("public/general/directive/confirm-hint"),a("public/general/directive/prevent-spread"),b.controller("restaurantDetailController",["$scope","$routeParams","restaurantService","menuService",function(a,b,c){a.goBack=function(){window.history.back()},a.restaurantId=b.restaurantId,c.getRestaurant(a.restaurantId).then(function(b){a.restaurant=b,a.newInfo=angular.copy(a.restaurant)},function(b){a.error=b}),a.editing=!1,a.edit=function(){a.editing=!0},a.cancel=function(){a.newInfo=angular.copy(a.restaurant),a.editing=!1},a.confirm=function(){a.editing=!1,c.updateRestaurantInfo(a.restaurantId,a.newInfo).then(function(){a.saved=!0},function(){a.saved=!1})}}])});