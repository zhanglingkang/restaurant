/*! ppz_website 2015-01-27 4:31:55 PM */
"use strict";define("restaurant-detail/review-item-controller",["app","./review-service"],function(a){var b=a("app");a("./review-service"),b.controller("reviewItemController",["$scope","reviewService",function(a,b){a.replying=!1,a.reply=function(){a.replying||(a.replying=!0)},a.confirmReply=function(){a.review.replyMessage=a.message,a.replying=!1,b.replyReview(a.restaurantId,a.review.reviewIndex,a.message).success(function(){a.saved=!0}).error(function(){a.saved=!1})},a.cancelReply=function(){a.review.replyMessage=null,a.replying=!1}}])});