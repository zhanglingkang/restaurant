/*! ppz_website 2015-02-05 3:20:31 PM */
"use strict";define("restaurant-detail/picture-service",["app"],function(a){var b=a("app");b.factory("pictureService",["$window","$cookies","httpService",function(a,b,c){return{upload:function(a,b){return c.post({url:c.FILE_SERVER_URL,isForm:!0,data:{restaurantId:b,file:a}})},getPictures:function(a){return c.post({command:"getRestaurantPicture",data:{restaurantId:a}})},removePicture:function(a){return c.post({command:"removeRestaurantPicture",data:a})},modifyIntroduce:function(a){return c.post({command:"modifyRestaurantPictureComment",data:a})}}}])});