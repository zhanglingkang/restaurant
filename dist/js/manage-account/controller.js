/*! ppz_website 2015-02-05 3:57:11 PM */
"use strict";define("manage-account/controller",["app","./service"],function(a){var b=a("app");a("./service"),b.controller("manageAccountController",["$cookies","$scope","manageAccountService","httpService",function(a,b,c,d){c.modifyPassword=c.modifyPassword.setRequestStatus(b,"modifyPasswordStatus"),c.modifyEmail=c.modifyPassword.setRequestStatus(b,"modifyPasswordStatus"),b.submitted=!1,b.modifyPasswordForm={oldPassword:"",newPassword:"",againPassword:""},b.modifyPasswordStatus=b.REQUEST_STATUS.INIT,b.modifyPassword=function(a){b.submitted=!0,a&&b.modifyPasswordForm.newPassword===b.modifyPasswordForm.againPassword&&c.modifyPassword(b.modifyPasswordForm.oldPassword,b.modifyPasswordForm.newPassword).error(function(a){angular.isObject(a)&&a.code==d.PPZ_CODE.OLD_PASSWORD_ERROR&&(b.failHint="旧密码不正确")})},b.modifyEmailStatus=b.REQUEST_STATUS.INIT,b.wantModifyEmail=!1,b.modifyEmail=function(a){b.wantModifyEmail=!0,a&&c.modifyEmail(b.email).error(function(){b.modifyEmailHint="修改email失败"})},c.getUserInfo().then(function(a){b.email=a.results[0].email})}])});