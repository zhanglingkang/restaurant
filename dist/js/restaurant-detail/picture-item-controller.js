/*! ppz_website 2015-01-12 6:59:27 PM */
"use strict";define(function(a){var b=a("app");a("./picture-service"),b.controller("pictureItemController",["$cookies","$scope","pictureService",function(a,b,c){b.file.pictureCommentCopy=b.file.pictureComment,b.modifyIntroduce=function(a){a&&c.modifyIntroduce({pictureId:b.file.pictureId,pictureComment:b.file.pictureCommentCopy,restaurantId:b.file.restaurantId}).then(function(){b.file.pictureComment=b.file.pictureCommentCopy,b.popoverScope.close()},function(){})}}])});