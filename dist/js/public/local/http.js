/*! ppz_website 2015-01-27 4:31:55 PM */
"use strict";define("public/local/http",["app","public/general/util","./system","public/general/pub-sub"],function(a){function b(a,b){return{data:JSON.stringify({command:a,inputs:b}),hash:"pleasedonotcheckmyhashthankyou!!"}}var c="//awsjp.ppzapp.com:34952",c="//ali.ppzapp.cn:34952",d=c+"/BBQueue/API",e=c+"/BBQueue/CredentialService",f=c+"/FileUploader/upload",g=c+"/FileUploader/menuUpload",h={SUCCESS:0,USER_NOT_FOUND:14,SESSION_TIMEOUT:16,LOGIN_FAIL:17,PERMISSION_DENIED:18,OLD_PASSWORD_ERROR:24},i=a("app"),j=(a("public/general/util"),a("./system"),a("public/general/pub-sub"));i.service("httpService",["$http","$rootScope","$q","$location","$cookies",function(a,c,i,k,l){return{SERVER_URL:d,AUTH_SERVER_URL:e,FILE_SERVER_URL:f,MENU_IMPORT_URL:g,PPZ_CODE:h,post:function(c){var e=i.defer(),g=new FormData,m=c.config||{};if(c.data=c.data||{},c.includeSessionId=c.includeSessionId===!1?!1:!0,c.includeSessionId&&(c.data.sessionId=l.token),c.isForm){angular.extend(m,{transformRequest:angular.identity,headers:{"Content-Type":void 0}});for(var n in c.data)g.append(n,c.data[n]);c.data=g}else c.data=b(c.command,c.data);return c.url=c.url||c.isForm?f:d,a(angular.extend(m,{method:"POST",url:c.url,data:c.data})).success(function(a,b,c,d){if(angular.isObject(a)){var f=JSON.parse(a.data);f.code==h.SUCCESS?e.resolve(f):(e.reject(f),f.code==h.SESSION_TIMEOUT?(delete l.token,delete l.username,k.path("/login")):f.code==h.PERMISSION_DENIED?j.publish("businessError",{msg:"权限不足"}):j.publish("businessError",{msg:f.message}))}else j.publish("jsonError",{status:b,response:a,url:d.command}),e.reject(f)}).error(function(a,b,c,d){j.publish("serverError",{msg:"服务器出错了！，命令："+d.data.command+",响应码:"+b}),e.reject(a)}),e.promise.success=function(a){return e.promise.then(a),e.promise},e.promise.error=function(a){return e.promise.then(null,a),e.promise},e.promise}}}])});