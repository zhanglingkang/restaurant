/*! ppz_website 2015-01-12 6:59:27 PM */
"use strict";define(function(a){var b=a("app");a("./picture-service"),a("./picture-item-controller"),b.controller("fileUploader",["$cookies","$scope","pictureService","FileUploader",function(a,b,c,d){var e=new FormData;e.append("sessionId",a.token),e.append("restaurantId",b.restaurantId),b.uploader=new d({url:c.FILE_SERVER_URL,formData:[{sessionId:a.token},{restaurantId:b.restaurantId},{userId:a.username}],filter:[{name:"commentIsRequired",fn:function(a){return!!a.pictureComment}}]}),b.fileList=[],b.uploader.onBeforeUploadItem=function(a){a.formData.push({pictureComment:a.pictureComment})},b.upload=function(a){a.wantUpload=!0,a.pictureComment&&a.upload()},b.uploadAll=function(){b.uploader.queue.forEach(function(a){a.isSuccess||b.upload(a)})},b.uploader.onSuccessItem=function(a,c){var d=JSON.parse(c.data).results;b.fileList=b.fileList.concat(d)},c.getPictures(b.restaurantId).then(function(a){angular.forEach(a.results[0].uploadedPictures,function(a){b.fileList.push(a)})}),b.removePicture=function(a){c.removePicture({restaurantId:b.restaurantId,pictureId:a.pictureId}).then(function(){b.fileList=b.fileList.filter(function(b){return b.pictureId!=a.pictureId})})}}])});