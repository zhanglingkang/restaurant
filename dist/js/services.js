/*! ppz_website 2014-12-02 2:52:39 PM */
!function(){function a(a,b){return{data:JSON.stringify({command:a,inputs:b}),hash:"pleasedonotcheckmyhashthankyou!!"}}var b="http://awsjp.ppzapp.com:34952",b="http://ali.ppzapp.cn:34952",c=b+"/BBQueue/API",d=b+"/BBQueue/CredentialService",e=b+"/FileUploader/upload",f=b+"/FileUploader/menuUpload",g={None:0,UserNotFound:14,SESSION_TIMEOUT:16},h=angular.module("ppzServices",["ngResource"]);h.factory("http",["$http","$q","$location","$cookies",function(a,b,d,e){return{request:function(c){var f=b.defer();return a(c).success(function(a){var b=JSON.parse(a.data);b.code==g.None?f.resolve(b):(f.reject(b),b.code==g.SESSION_TIMEOUT&&(delete e.token,delete e.username,d.path("/login")))}).error(function(a){f.reject(a)}),f.promise.success=function(a){return f.promise.then(a),f.promise},f.promise.error=function(a){return f.promise.then(null,a),f.promise},f.promise},get:function(a,b){return b=b||{},this.request(angular.extend(b,{method:"GET",url:a}))},post:function(a,b,d){return angular.isObject(a)&&(d=b,b=a,a=c),d=d||{},this.request(angular.extend(d,{method:"POST",url:a,data:b}))}}}]),h.factory("public",[function(){var a={store:function(a,b){var c=JSON.stringify(b);sessionStorage.setItem(a,c)},remove:function(a){sessionStorage.removeItem(a)},has:function(a){return!!sessionStorage.getItem(a)},get:function(a){var b=sessionStorage.getItem(a);return JSON.parse(b)}};return{buffer:a}}]),h.factory("Login",["$http","$q","$window","$cookies","http",function(b,e,f,g,h){var i={login:function(b,d){var f=(e.defer(),a("login",{userId:b,password:d})),i=h.post(c,f);return i.then(function(a){var c=a.results[0].sessionId;g.token=c,g.username=b},function(){g.token=null}),i},logout:function(b){var d=a("logout",{sessionId:g.token}),e=h.post(c,d);return e.then(function(){g.token=null,b()},function(a){console.log("encounted error in getMyRestaurantList: "+a)}),e},resetPassword:function(b,c,e){var f=a("requestUserPasswordReset",{userId:b}),g=h.post(d,f);return g.then(function(a){c(a)},function(a){e(a)}),g}};return i}]),h.service("RestaurantService",["$http","$window","$q","$cookies","http",function(b,d,e,f,g){var h;return{getMyRestaurantList:function(){var b=a("getManagingRestaurants",{sessionId:f.token});return h||(h=g.post(c,b),h.then(function(){},function(a){console.log("businessError:getManagingRestaurants: "+a),h=null})),h},getRestaurant:function(a){var b=e.defer();return this.getMyRestaurantList().then(function(c){for(var d=0;d<c.results.length;++d)if(c.results[d].restaurantId===a){b.resolve(c.results[d]);break}d==c.results.length&&b.reject("没找到对应餐厅")},function(a){b.reject(a)}),b.promise},acceptReservation:function(b,c){var d=a("modifyRestaurantInfo",{sessionId:f.token,restaurantId:b,acceptReservation:c});return g.post(d)},enableQueue:function(b,c){var d=a("modifyRestaurantInfo",{sessionId:f.token,restaurantId:b,enableQueue:c});return g.post(d)},setMaxQueue:function(b,c){var d=a("modifyRestaurantInfo",{sessionId:f.token,restaurantId:b,maxQueueLength:c});return g.post(d)},updateRestaurantInfo:function(b,c){var d=a("modifyRestaurantInfo",{sessionId:f.token,restaurantId:b,"phone.number":c.phone.phone,email:c.email,website:c.website,restaurantDescription:c.restaurantDescription,"address.city":c.address.city,"address.location":c.address.location,"address.state":c.address.state,"address.street":c.address.street,"address.zipcode":c.address.zipcode});return g.post(d)},getWaitingList:function(b,d){var e=a("allUnitInfo",{sessionId:f.token,restaurantId:b}),h=g.post(c,e);return h.then(function(a){d(null,a.results[0])},function(a){console.log("encounted error in queryRestaurantQueue: "+a),d(a)}),h}}}]),h.factory("WaitingListService",["$http","$window","$cookies",function(b,d,e){return{lastCalledNumber:0,callUser:function(d,f,h){this.lastCalledNumber=f;var i=a("callUser",{sessionId:e.token,restaurantId:d,unitId:f});b.post(c,i).success(function(a){var b=JSON.parse(a.data);b.code!=g.None?h(b.message):h(null,b.results[0])}).error(function(a){console.log("encounted error in callUser: "+a),h(a)})},removeUser:function(d,f,h,i){var j="waitingToComplete";"reservation"===h&&(j="reservationToComplete");var k=a(j,{sessionId:e.token,restaurantId:d,unitId:f});b.post(c,k).success(function(a){var b=JSON.parse(a.data);b.code!=g.None?i(b.message):i(null,b.results[0])}).error(function(a){console.log("encounted error in removeUser: "+a),i(a)})},addUser:function(d,f,h,i,j,k){null!==j&&(j=Math.round(j.getTime()/1e3));var l=a("addAdhocUserToQueue",{sessionId:e.token,restaurantId:d,name:f,partyTypeId:parseInt(h),"phone.number":i,reservationTime:j});b.post(c,l).success(function(a){var b=JSON.parse(a.data);b.code!=g.None?k(b.message):k(null,b.results[0])}).error(function(a){console.log("encounted error in addUser: "+a),k(a)})}}}]),h.service("MenuService",["$http","$window","$cookies","http",function(b,d,e,h){var i;return{_menu:null,getMenu:function(b){var d=this,f=a("getRestaurantMenu",{sessionId:e.token,restaurantId:b});return i||(i=h.post(c,f),i.then(function(a){d._menu=a.results[0]},function(a){console.log("encounted error in getRestaurantMenu: "+a),i=null})),i},importMenu:function(a,b){var c=new FormData;return c.append("file",a),c.append("sessionId",e.token),c.append("restaurantId",b),h.post(f,c,{transformRequest:angular.identity,headers:{"Content-Type":void 0}})},addMenuCategory:function(b,c){var d=a("createMenuCategory",angular.extend(b,{sessionId:e.token,restaurantId:c}));return h.post(d)},modifyMenuCategory:function(b,c){var d=a("modifyMenuCategory",angular.extend(b,{sessionId:e.token,restaurantId:c}));return h.post(d)},removeMenuCategory:function(b,c){var d=a("deleteMenuCategory",{sessionId:e.token,restaurantId:c,categoryId:b});return h.post(d)},addMenuItem:function(b,c){var d=a("createMenuItem",angular.extend(b,{sessionId:e.token,restaurantId:c}));return h.post(d)},modifyMenuItem:function(b,c){var d=a("modifyMenuItem",angular.extend(b,{sessionId:e.token,restaurantId:c}));return h.post(d)},removeMenuItem:function(b,c){var d=a("deleteMenuItem",angular.extend(b,{sessionId:e.token,restaurantId:c}));return h.post(d)},sortMenuCategory:function(b,c){var d=a("pivotMenuCategory",angular.extend(b,{sessionId:e.token,restaurantId:c}));return h.post(d)},sortMenuItem:function(b,c){var d=a("pivotMenuItem",angular.extend(b,{sessionId:e.token,restaurantId:c}));return h.post(d)},updateMenu:function(d,f){var h=a("upsertRestaurantMenu",{sessionId:e.token,restaurantId:d.restaurantId,menuCategories:d.menuCategories});b.post(c,h).success(function(a){var b=JSON.parse(a.data);b.code!=g.None?f(b.message):f(null,b.results[0])}).error(function(a){console.log("encounted error in getRestaurantMenu: "+a),f(a)})}}}]),h.factory("ReviewService",["$http","$window","$cookies",function(b,d,e){return{getReviewList:function(d,f,h){var i=a("getRestaurantReviewList",{sessionId:e.token,restaurantId:d,startIndex:10*f+1,size:10});b.post(c,i).success(function(a){var b=JSON.parse(a.data);b.code!=g.None?h(b.message):h(null,b.results)}).error(function(a){console.log("encounted error in getReviews: "+a),h(a)})},replyReview:function(d,f,h,i){var j=a("replyRestaurantReview",{sessionId:e.token,restaurantId:d,reviewId:Number(f),replyMessage:h});b.post(c,j).success(function(a){var b=JSON.parse(a.data);b.code!=g.None?i(b.message):i(null,b.results)}).error(function(a){console.log("encounted error in getReviews: "+a),i(a)})}}}]),h.factory("FileUploadService",["$http","$window","$cookies","http",function(b,c,d,f){return{FILE_SERVER_URL:e,upload:function(a,c){var f=new FormData;angular.forEach(a,function(a){f.append("file",a)}),f.append("sessionId",d.token),f.append("restaurantId",c),b.post(e,f,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).success(function(a){JSON.parse(a.data)})},getPictures:function(b){var c=a("getRestaurantPicture",{sessionId:d.token,restaurantId:b});return f.post(c)},removePicture:function(b){var c=a("removeRestaurantPicture",angular.extend(b,{sessionId:d.token}));return f.post(c)},modifyIntroduce:function(b){var c=a("modifyRestaurantPictureComment",angular.extend(b,{sessionId:d.token}));return f.post(c)}}}]),h.service("manageAccountService",["$http","$window","$cookies","http",function(b,d,e,f){var h,i=function(d,e,f){var h=a("updateUserInfo",d);b.post(c,h).success(function(a){var b=JSON.parse(a.data);b.code!=g.None?f(b):e(b.results)}).error(function(a){console.log("encounted error in getReviews: "+a),f(a)})};return{modifyPassword:function(a,b,c,d){var f={sessionId:e.token,userId:e.username,password:b,oldPassword:a};i(f,c,d)},modifyEmail:function(a,b,c){var d={sessionId:e.token,userId:e.username,email:a};i(d,b,c)},getUserInfo:function(){var b=a("getUserInfo",{sessionId:e.token});return h||(h=f.post(c,b).catch(function(){h=null})),h}}}])}();