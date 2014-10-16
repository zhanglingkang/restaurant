/*! ppz_website 2014-10-16 6:36:22 PM */
function createRequest(a,b){return{data:JSON.stringify({command:a,inputs:b}),hash:"pleasedonotcheckmyhashthankyou!!"}}var SERVER="http://awsjp.ppzapp.com:34952",SERVER="http://ali.ppzapp.cn:34952",SERVER_URL=SERVER+"/BBQueue/API",AUTH_SERVER_URL=SERVER+"/BBQueue/CredentialService",FILE_SERVER_URL=SERVER+"/FileUploader/upload",MENU_IMPORT_URL=SERVER+"/FileUploader/menuUpload",PPZ_ERROR={None:0,UserNotFound:14,SESSION_TIMEOUT:16},ppzServices=angular.module("ppzServices",["ngResource"]);ppzServices.factory("http",["$http","$q","$location",function(a,b,c){return{request:function(d){var e=b.defer();return a(d).success(function(a){var b=JSON.parse(a.data);b.code==PPZ_ERROR.None?e.resolve(b):b.code==PPZ_ERROR.SESSION_TIMEOUT?c.path("/login"):e.reject(b)}).error(function(a){e.reject(a)}),e.promise},get:function(a,b){return b=b||{},this.request(angular.extend(b,{method:"GET",url:a}))},post:function(a,b,c){return c=c||{},this.request(angular.extend(c,{method:"POST",url:a,data:b}))}}}]),ppzServices.factory("public",[function(){var a={store:function(a,b){var c=JSON.stringify(b);sessionStorage.setItem(a,c)},remove:function(a){sessionStorage.removeItem(a)},has:function(a){return!!sessionStorage.getItem(a)},get:function(a){var b=sessionStorage.getItem(a);return JSON.parse(b)}};return{buffer:a}}]),ppzServices.factory("Login",["$http","$q","$window","$cookies","http",function(a,b,c,d,e){var f={login:function(a,c){var f=(b.defer(),createRequest("login",{userId:a,password:c})),g=e.post(SERVER_URL,f);return g.then(function(b){var c=b.results[0].sessionId;d.token=c,d.username=a},function(){d.token=null}),g},logout:function(a){var b=createRequest("logout",{sessionId:d.token}),c=e.post(SERVER_URL,b);return c.then(function(){d.token=null,a()},function(a){console.log("encounted error in getMyRestaurantList: "+a)}),c},resetPassword:function(a,b,c){var d=createRequest("requestUserPasswordReset",{userId:a}),f=e.post(AUTH_SERVER_URL,d);return f.then(function(a){b(a)},function(a){c(a)}),f}};return f}]),ppzServices.service("RestaurantService",["$http","$window","$q","$cookies","http",function(a,b,c,d,e){var f;return{_restaurantList:null,getMyRestaurantList:function(a){var b=this,c=createRequest("getManagingRestaurants",{sessionId:d.token});return f||(f=e.post(SERVER_URL,c),f.then(function(c){b._restaurantList=c.results,a(null,c.results)},function(){console.log("encounted error in getMyRestaurantList: "+error)})),f},getRestaurant:function(a,b){var d=this,e=c.defer();this._restaurantList?e.resolve():this.getMyRestaurantList(function(a){a?e.reject(a):e.resolve()}),e.promise.then(function(){for(var c=0;c<d._restaurantList.length;++c)if(d._restaurantList[c].restaurantId===a)return b(null,d._restaurantList[c])},function(a){b(a)})},updateRestaurantInfo:function(a,b){var c=createRequest("modifyRestaurantInfo",{sessionId:d.token,restaurantId:a,"phone.number":b.phone.phone,email:b.email,website:b.website,restaurantDescription:b.restaurantDescription,"address.city":b.address.city,"address.location":b.address.location,"address.state":b.address.state,"address.street":b.address.street,"address.zipcode":b.address.zipcode});return e.post(SERVER_URL,c)},getWaitingList:function(a,b){var c=createRequest("allUnitInfo",{sessionId:d.token,restaurantId:a}),f=e.post(SERVER_URL,c);return f.then(function(a){b(null,a.results[0])},function(a){console.log("encounted error in queryRestaurantQueue: "+a),b(a)}),f}}}]),ppzServices.factory("WaitingListService",["$http","$window","$cookies",function(a,b,c){return{lastCalledNumber:0,callUser:function(b,d,e){this.lastCalledNumber=d;var f=createRequest("callUser",{sessionId:c.token,restaurantId:b,unitId:d});a.post(SERVER_URL,f).success(function(a){var b=JSON.parse(a.data);b.code!=PPZ_ERROR.None?e(b.message):e(null,b.results[0])}).error(function(a){console.log("encounted error in callUser: "+a),e(a)})},removeUser:function(b,d,e,f){var g="waitingToComplete";"reservation"===e&&(g="reservationToComplete");var h=createRequest(g,{sessionId:c.token,restaurantId:b,unitId:d});a.post(SERVER_URL,h).success(function(a){var b=JSON.parse(a.data);b.code!=PPZ_ERROR.None?f(b.message):f(null,b.results[0])}).error(function(a){console.log("encounted error in removeUser: "+a),f(a)})},addUser:function(b,d,e,f,g,h){null!==g&&(g=Math.round(g.getTime()/1e3));var i=createRequest("addAdhocUserToQueue",{sessionId:c.token,restaurantId:b,name:d,partyTypeId:parseInt(e),"phone.number":f,reservationTime:g});a.post(SERVER_URL,i).success(function(a){var b=JSON.parse(a.data);b.code!=PPZ_ERROR.None?h(b.message):h(null,b.results[0])}).error(function(a){console.log("encounted error in addUser: "+a),h(a)})}}}]),ppzServices.factory("MenuService",["$http","$window","$cookies","http",function(a,b,c,d){return{_menu:null,getMenu:function(a,b){var e=this,f=createRequest("getRestaurantMenu",{sessionId:c.token,restaurantId:a}),g=d.post(SERVER_URL,f);return g.then(function(a){e._menu=a.results[0],b(null,e._menu)},function(a){console.log("encounted error in getRestaurantMenu: "+a),b(a)}),g},importMenu:function(a,b){var e=new FormData;return e.append("file",a),e.append("sessionId",c.token),e.append("restaurantId",b),d.post(MENU_IMPORT_URL,e,{transformRequest:angular.identity,headers:{"Content-Type":void 0}})},updateMenu:function(b,d){var e=createRequest("upsertRestaurantMenu",{sessionId:c.token,restaurantId:b.restaurantId,menuCategories:b.menuCategories});a.post(SERVER_URL,e).success(function(a){var b=JSON.parse(a.data);b.code!=PPZ_ERROR.None?d(b.message):d(null,b.results[0])}).error(function(a){console.log("encounted error in getRestaurantMenu: "+a),d(a)})}}}]),ppzServices.factory("ReviewService",["$http","$window","$cookies",function(a,b,c){return{getReviewList:function(b,d,e){var f=createRequest("getRestaurantReviewList",{sessionId:c.token,restaurantId:b,startIndex:10*d+1,size:10});a.post(SERVER_URL,f).success(function(a){var b=JSON.parse(a.data);b.code!=PPZ_ERROR.None?e(b.message):e(null,b.results)}).error(function(a){console.log("encounted error in getReviews: "+a),e(a)})},replyReview:function(b,d,e,f){var g=createRequest("replyRestaurantReview",{sessionId:c.token,restaurantId:b,reviewId:Number(d),replyMessage:e});a.post(SERVER_URL,g).success(function(a){var b=JSON.parse(a.data);b.code!=PPZ_ERROR.None?f(b.message):f(null,b.results)}).error(function(a){console.log("encounted error in getReviews: "+a),f(a)})}}}]),ppzServices.factory("FileUploadService",["$http","$window","$cookies",function(a,b,c){return{FILE_SERVER_URL:FILE_SERVER_URL,upload:function(b,d){var e=new FormData;angular.forEach(b,function(a){e.append("file",a)}),e.append("sessionId",c.token),e.append("restaurantId",d),a.post(FILE_SERVER_URL,e,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).success(function(a){JSON.parse(a.data)})}}}]),ppzServices.service("manageAccountService",["$http","$window","$cookies","http",function(a,b,c,d){var e,f=function(b,c,d){var e=createRequest("updateUserInfo",b);a.post(SERVER_URL,e).success(function(a){var b=JSON.parse(a.data);b.code!=PPZ_ERROR.None?d(b):c(b.results)}).error(function(a){console.log("encounted error in getReviews: "+a),d(a)})};return{modifyPassword:function(a,b,d,e){var g={sessionId:c.token,userId:c.username,password:b,oldPassword:a};f(g,d,e)},modifyEmail:function(a,b,d){var e={sessionId:c.token,userId:c.username,email:a};f(e,b,d)},getUserInfo:function(){var a=createRequest("getUserInfo",{sessionId:c.token});return e||(e=d.post(SERVER_URL,a)),e}}}]);