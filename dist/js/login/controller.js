/*! ppz_website 2015-02-03 11:00:22 AM */
"use strict";define("login/controller",["app","./service","public/local/reservation-service"],function(a){var b=a("app");a("./service"),a("public/local/reservation-service"),b.controller("loginController",["$scope","loginService","$window","$location","$cookies","reservationService",function(a,b,c,d,e,f){b.resetPassword=b.resetPassword.setRequestStatus(a,"resetStatus"),b.login=b.login.setRequestStatus(a,"loginStatus"),a.getUserName=function(){return e.username},a.resetPasswordForm={userName:""},a.submitted=!1,a.initResetInfo=function(){a.resetPasswordForm.userName="",a.resetStatus=a.REQUEST_STATUS.INIT,a.submitted=!1},a.resetStatus=a.REQUEST_STATUS.INIT,a.resetPassword=function(c){a.submitted=!0,c&&b.resetPassword(a.resetPasswordForm.userName).error(function(b){a.resetHint=b.message})},a.loginStatus=a.REQUEST_STATUS.INIT,a.performLogin=function(){a.loginHintShow=!0,b.login(a.username,a.password).then(function(a){console.log("login result "+a),console.log("token "+e.token),d.path("/myRestaurants"),f.connect()},function(a){console.log("login failed "+a)})},a.logout=function(){b.logout(function(){location.reload()})}}])});