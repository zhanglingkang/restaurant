/*! ppz_website 2015-01-27 4:31:55 PM */
"use strict";define("restaurant-detail/review-list-controller",["app","./review-service"],function(a){var b=a("app");a("./review-service"),b.controller("reviewListController",["$scope","$routeParams","$timeout","reviewService",function(a,b,c,d){a.loading=!0,a.currentPage=1,a.selectPage=function(b){d.getReviewList(a.restaurantId,b-1).success(function(b){var c=b.results;a.loading=!1,a.reviewList=c,a.reviewList.forEach(function(a){a.rating/=2})})},a.selectPage(1)}])});