/*! ppz_website 2014-10-22 9:47:54 AM */
function createRequest(a,b){return{data:JSON.stringify({command:a,inputs:b}),hash:"pleasedonotcheckmyhashthankyou!!"}}var SERVER="http://awsjp.ppzapp.com:34952",SERVER="http://ali.ppzapp.cn:34952",SERVER_URL=SERVER+"/BBQueue/API",AUTH_SERVER_URL=SERVER+"/BBQueue/CredentialService",FILE_SERVER_URL=SERVER+"/FileUploader/upload",MENU_IMPORT_URL=SERVER+"/FileUploader/menuUpload",PPZ_ERROR={None:0,UserNotFound:14,SESSION_TIMEOUT:16},ppzServices=angular.module("ppzServices",["ngResource"]);ppzServices.factory("http",["$http","$q","$location",function(a,b,c){return{request:function(d){var e=b.defer();return a(d).success(function(a){var b=JSON.parse(a.data);b.code==PPZ_ERROR.None?e.resolve(b):(e.reject(b),b.code==PPZ_ERROR.SESSION_TIMEOUT&&c.path("/login"))}).error(function(a){e.reject(a)}),e.promise},get:function(a,b){return b=b||{},this.request(angular.extend(b,{method:"GET",url:a}))},post:function(a,b,c){return angular.isObject(a)&&(c=b,b=a,a=SERVER_URL),c=c||{},this.request(angular.extend(c,{method:"POST",url:a,data:b}))}}}]),ppzServices.factory("public",[function(){var a={store:function(a,b){var c=JSON.stringify(b);sessionStorage.setItem(a,c)},remove:function(a){sessionStorage.removeItem(a)},has:function(a){return!!sessionStorage.getItem(a)},get:function(a){var b=sessionStorage.getItem(a);return JSON.parse(b)}};return{buffer:a}}]),ppzServices.factory("Login",["$http","$q","$window","$cookies","http",function(a,b,c,d,e){var f={login:function(a,c){var f=(b.defer(),createRequest("login",{userId:a,password:c})),g=e.post(SERVER_URL,f);return g.then(function(b){var c=b.results[0].sessionId;d.token=c,d.username=a},function(){d.token=null}),g},logout:function(a){var b=createRequest("logout",{sessionId:d.token}),c=e.post(SERVER_URL,b);return c.then(function(){d.token=null,a()},function(a){console.log("encounted error in getMyRestaurantList: "+a)}),c},resetPassword:function(a,b,c){var d=createRequest("requestUserPasswordReset",{userId:a}),f=e.post(AUTH_SERVER_URL,d);return f.then(function(a){b(a)},function(a){c(a)}),f}};return f}]),ppzServices.service("RestaurantService",["$http","$window","$q","$cookies","http",function(a,b,c,d,e){var f;return{getMyRestaurantList:function(){var a=createRequest("getManagingRestaurants",{sessionId:d.token});return f||(f=e.post(SERVER_URL,a),f.then(function(){},function(a){console.log("businessError:getManagingRestaurants: "+a),f=null})),f},getRestaurant:function(a){var b=c.defer();return this.getMyRestaurantList().then(function(c){for(var d=0;d<c.results.length;++d)if(c.results[d].restaurantId===a){b.resolve(c.results[d]);break}d==c.results.length&&b.reject("没找到对应餐厅")},function(a){b.reject(a)}),b.promise},updateRestaurantInfo:function(a,b){var c=createRequest("modifyRestaurantInfo",{sessionId:d.token,restaurantId:a,"phone.number":b.phone.phone,email:b.email,website:b.website,restaurantDescription:b.restaurantDescription,"address.city":b.address.city,"address.location":b.address.location,"address.state":b.address.state,"address.street":b.address.street,"address.zipcode":b.address.zipcode});return e.post(SERVER_URL,c)},getWaitingList:function(a,b){var c=createRequest("allUnitInfo",{sessionId:d.token,restaurantId:a}),f=e.post(SERVER_URL,c);return f.then(function(a){b(null,a.results[0])},function(a){console.log("encounted error in queryRestaurantQueue: "+a),b(a)}),f}}}]),ppzServices.factory("WaitingListService",["$http","$window","$cookies",function(a,b,c){return{lastCalledNumber:0,callUser:function(b,d,e){this.lastCalledNumber=d;var f=createRequest("callUser",{sessionId:c.token,restaurantId:b,unitId:d});a.post(SERVER_URL,f).success(function(a){var b=JSON.parse(a.data);b.code!=PPZ_ERROR.None?e(b.message):e(null,b.results[0])}).error(function(a){console.log("encounted error in callUser: "+a),e(a)})},removeUser:function(b,d,e,f){var g="waitingToComplete";"reservation"===e&&(g="reservationToComplete");var h=createRequest(g,{sessionId:c.token,restaurantId:b,unitId:d});a.post(SERVER_URL,h).success(function(a){var b=JSON.parse(a.data);b.code!=PPZ_ERROR.None?f(b.message):f(null,b.results[0])}).error(function(a){console.log("encounted error in removeUser: "+a),f(a)})},addUser:function(b,d,e,f,g,h){null!==g&&(g=Math.round(g.getTime()/1e3));var i=createRequest("addAdhocUserToQueue",{sessionId:c.token,restaurantId:b,name:d,partyTypeId:parseInt(e),"phone.number":f,reservationTime:g});a.post(SERVER_URL,i).success(function(a){var b=JSON.parse(a.data);b.code!=PPZ_ERROR.None?h(b.message):h(null,b.results[0])}).error(function(a){console.log("encounted error in addUser: "+a),h(a)})}}}]),ppzServices.service("MenuService",["$http","$window","$cookies","http",function(a,b,c,d){var e;return{_menu:null,getMenu:function(a){var b=this,f=createRequest("getRestaurantMenu",{sessionId:c.token,restaurantId:a});return e||(e=d.post(SERVER_URL,f),e.then(function(a){b._menu=a.results[0]},function(a){console.log("encounted error in getRestaurantMenu: "+a),e=null})),e},importMenu:function(a,b){var e=new FormData;return e.append("file",a),e.append("sessionId",c.token),e.append("restaurantId",b),d.post(MENU_IMPORT_URL,e,{transformRequest:angular.identity,headers:{"Content-Type":void 0}})},addMenuCategory:function(a,b){var e=createRequest("createMenuCategory",angular.extend(a,{sessionId:c.token,restaurantId:b}));return d.post(e)},modifyMenuCategory:function(a,b){var e=createRequest("modifyMenuCategory",angular.extend(a,{sessionId:c.token,restaurantId:b}));return d.post(e)},removeMenuCategory:function(a,b){var e=createRequest("deleteMenuCategory",{sessionId:c.token,restaurantId:b,categoryId:a});return d.post(e)},addMenuItem:function(a,b){var e=createRequest("createMenuItem",angular.extend(a,{sessionId:c.token,restaurantId:b}));return d.post(e)},modifyMenuItem:function(a,b){var e=createRequest("modifyMenuItem",angular.extend(a,{sessionId:c.token,restaurantId:b}));return d.post(e)},removeMenuItem:function(a,b){var e=createRequest("deleteMenuItem",angular.extend(a,{sessionId:c.token,restaurantId:b}));return d.post(e)},sortMenuCategory:function(a,b){var e=createRequest("pivotMenuCategory",angular.extend(a,{sessionId:c.token,restaurantId:b}));return d.post(e)},sortMenuItem:function(a,b){var e=createRequest("pivotMenuItem",angular.extend(a,{sessionId:c.token,restaurantId:b}));return d.post(e)},updateMenu:function(b,d){var e=createRequest("upsertRestaurantMenu",{sessionId:c.token,restaurantId:b.restaurantId,menuCategories:b.menuCategories});a.post(SERVER_URL,e).success(function(a){var b=JSON.parse(a.data);b.code!=PPZ_ERROR.None?d(b.message):d(null,b.results[0])}).error(function(a){console.log("encounted error in getRestaurantMenu: "+a),d(a)})}}}]),ppzServices.factory("ReviewService",["$http","$window","$cookies",function(a,b,c){return{getReviewList:function(b,d,e){var f=createRequest("getRestaurantReviewList",{sessionId:c.token,restaurantId:b,startIndex:10*d+1,size:10});a.post(SERVER_URL,f).success(function(a){var b=JSON.parse(a.data);b.code!=PPZ_ERROR.None?e(b.message):e(null,b.results)}).error(function(a){console.log("encounted error in getReviews: "+a),e(a)})},replyReview:function(b,d,e,f){var g=createRequest("replyRestaurantReview",{sessionId:c.token,restaurantId:b,reviewId:Number(d),replyMessage:e});a.post(SERVER_URL,g).success(function(a){var b=JSON.parse(a.data);b.code!=PPZ_ERROR.None?f(b.message):f(null,b.results)}).error(function(a){console.log("encounted error in getReviews: "+a),f(a)})}}}]),ppzServices.factory("FileUploadService",["$http","$window","$cookies","http",function(a,b,c,d){return{FILE_SERVER_URL:FILE_SERVER_URL,upload:function(b,d){var e=new FormData;angular.forEach(b,function(a){e.append("file",a)}),e.append("sessionId",c.token),e.append("restaurantId",d),a.post(FILE_SERVER_URL,e,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).success(function(a){JSON.parse(a.data)})},getPictures:function(a){var b=createRequest("getRestaurantPicture",{sessionId:c.token,restaurantId:a});return d.post(b)},removePicture:function(a){var b=createRequest("removeRestaurantPicture",angular.extend(a,{sessionId:c.token}));return d.post(b)},modifyIntroduce:function(a){var b=createRequest("modifyRestaurantPictureComment",angular.extend(a,{sessionId:c.token}));return d.post(b)}}}]),ppzServices.service("manageAccountService",["$http","$window","$cookies","http",function(a,b,c,d){var e,f=function(b,c,d){var e=createRequest("updateUserInfo",b);a.post(SERVER_URL,e).success(function(a){var b=JSON.parse(a.data);b.code!=PPZ_ERROR.None?d(b):c(b.results)}).error(function(a){console.log("encounted error in getReviews: "+a),d(a)})};return{modifyPassword:function(a,b,d,e){var g={sessionId:c.token,userId:c.username,password:b,oldPassword:a};f(g,d,e)},modifyEmail:function(a,b,d){var e={sessionId:c.token,userId:c.username,email:a};f(e,b,d)},getUserInfo:function(){var a=createRequest("getUserInfo",{sessionId:c.token});return e||(e=d.post(SERVER_URL,a).catch(function(){e=null})),e}}}]);