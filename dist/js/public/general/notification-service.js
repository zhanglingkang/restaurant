/*! ppz_website 2015-01-27 4:24:49 PM */
"use strict";define("public/general/notification-service",["app"],function(a){var b=a("app"),c=["$q",function(a){return{create:function(b,c){var d=a.defer();return"granted"===Notification.permission?d.resolve(new Notification(b,c)):"denied"!==Notification.permission&&(Notification.requestPermissioning||(Notification.requestPermissioning=!0,Notification.requestPermission(function(a){Notification.requestPermissioning=!1,"permission"in Notification||(Notification.permission=a),"granted"===Notification.permission?d.resolve(new Notification(b,c)):d.reject("权限不足")}))),d.promise}}}];b.service("notificationService",c)});