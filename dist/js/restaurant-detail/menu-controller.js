/*! ppz_website 2015-02-02 10:07:15 AM */
"use strict";define("restaurant-detail/menu-controller",["app","public/general/util","public/general/directive/ng-model","./menu-service","./menu-category-controller","./menu-item-controller","public/general/directive/drag-sort"],function(a){var b=a("app"),c=a("public/general/util");a("public/general/directive/ng-model"),a("./menu-service"),a("./menu-category-controller"),a("./menu-item-controller"),a("public/general/directive/drag-sort"),b.controller("menuController",["$scope","menuService","$timeout",function(a,b,d){function e(b){return void(a.menu=b)}function f(){a.categoryForm={categoryName:"",categoryDescription:""}}b.importMenu=b.importMenu.setRequestStatus(a,"importStatus"),b.sortMenuCategory=b.sortMenuCategory.setRequestStatus(a,"sortMenuCategoryStatus"),b.addMenuCategory=b.addMenuCategory.setRequestStatus(a,"addStatus"),a.adding=!1,a.menuFile=null,a.wantImport=!1,a.importStatus=a.REQUEST_STATUS.INIT,a.isExcel=function(){return c.isExcel(a.menuFile)},a.importMenu=function(){a.wantImport=!0,a.menuFile&&a.isExcel()&&b.importMenu(a.menuFile,a.restaurantId)},a.sortMenuCategoryStatus=a.REQUEST_STATUS.INIT,a.sortMenuCategory=function(c){var d=null,e=c.sortList;e.forEach(function(a,b){a.id===c.dragNodeId&&b>0&&(d=c.sortList[b-1].id)}),a.setAlert({showCover:!0,alertContent:"排序中..."}),b.sortMenuCategory({categoryId:c.dragNodeId,previousCategoryId:d},a.menu.restaurantId).then(function(){var b=[];e.forEach(function(c){b.push(a.getMenuCategory(c.id))}),a.menu.menuCategories=b,a.setAlert({showCover:!1})},function(){a.setAlert({showCover:!0,alertContent:"操作失败"})})},a.getMenuCategory=function(b){var c;return a.menu.menuCategories.some(function(a){return a.categoryId===b?(c=a,!0):void 0}),c},a.refreshMenu=function(){b.getMenu(a.restaurantId).then(function(a){e(a.results[0])},function(b){a.error=b})},a.refreshMenu(),a.collapseAll=function(b){a.$broadcast("collapse",b)},a.toAddMenuCategory=function(){a.adding=!0,a.addStatus=a.REQUEST_STATUS.INIT,f()},f(),a.addStatus=a.REQUEST_STATUS.INIT,a.addMenuCategory=function(c){c&&b.addMenuCategory(a.categoryForm,a.menu.restaurantId).then(function(b){f(),a.menu.menuCategories=a.menu.menuCategories.concat(b.results),a.adding=!1})}}])});