/*! ppz_website 2015-02-03 11:00:22 AM */
"use strict";define("restaurant-detail/review-service",["app"],function(a){var b=a("app");b.factory("reviewService",["$window","$cookies","httpService",function(a,b,c){return{getReviewList:function(a,b){return c.post({command:"getRestaurantReviewList",data:{restaurantId:a,startIndex:10*b+1,size:10}}).error(function(a){console.log("encounted error in getReviews: "+a)})},replyReview:function(a,b,d){return c.post({command:"replyRestaurantReview",data:{restaurantId:a,reviewId:Number(b),replyMessage:d}}).error(function(a){console.log("encounted error in getReviews: "+a)})}}}])});