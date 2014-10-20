/*! ppz_website 2014-10-20 6:38:22 PM */
var ppzRestaurant=angular.module("ppzRestaurant",["ngRoute","ngCookies","ppzControllers","ppzDirectives","ppzServices","ui.bootstrap","angularFileUpload"]);ppzRestaurant.config(["$routeProvider","$httpProvider","$interpolateProvider",function(a,b){b.interceptors.push(["$q","$location","$cookies",function(a,b,c){return{response:function(a){return"/login"!==b.path()&&"null"==c.token&&b.path("/login"),a}}}]),a.when("/login",{templateUrl:"partials/login.html",controller:"loginController"}).when("/myRestaurants",{templateUrl:"partials/restaurantList.html",controller:"restaurantListController"}).when("/restaurant/:restaurantId",{templateUrl:"partials/restaurantDetails.html",controller:"restaurantDetailController"}).when("/waitinglist/:restaurantId",{templateUrl:"partials/waitinglist.html",controller:"waitingListController"}).when("/publicWaitList/:restaurantId",{templateUrl:"partials/publicWaitList.html",controller:"publicWaitListController"}).when("/printNumber/:unitId",{templateUrl:"partials/printNumber.html",controller:"printNumberController"}).when("/manageAccount",{templateUrl:"partials/manageAccount.html",controller:"manageAccountController"}).otherwise({redirectTo:"/myRestaurants"})}]);