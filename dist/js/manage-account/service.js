/*! ppz_website 2015-02-10 10:45:23 AM */
"use strict";define("manage-account/service",["app"],function(a){var b=a("app");b.service("manageAccountService",["$window","$cookies","httpService",function(a,b,c){var d,e=function(a){return c.post({command:"updateUserInfo",data:a})};return{modifyPassword:function(a,c){var d={sessionId:b.token,userId:b.username,password:c,oldPassword:a};return e(d)},modifyEmail:function(a){var c={sessionId:b.token,userId:b.username,email:a};return e(c)},getUserInfo:function(){return d||(d=c.post({command:"getUserInfo"}).error(function(){d=null})),d}}}])});