/*! ppz_website 2015-02-05 3:57:11 PM */
"use strict";define("restaurant-detail/menu-category-controller",["app","./menu-service"],function(a){var b=a("app");a("./menu-service"),b.controller("menuCategoryController",["$scope","menuService",function(a,b){b.modifyMenuCategory=b.modifyMenuCategory.setRequestStatus(a,"editStatus"),b.removeMenuCategory=b.removeMenuCategory.setRequestStatus(a,"deleteStatus"),b.addMenuItem=b.addMenuItem.setRequestStatus(a,"addMenuItemStatus");a.addingNewItem=!1,a.editing=!1,a.nameModified=a.category.categoryName,a.descriptionModified=a.category.categoryDescription,a.editCategory=function(){a.editing=!0,a.editStatus=a.REQUEST_STATUS.INIT},a.confirmEditCategory=function(){b.modifyMenuCategory({categoryName:a.nameModified,categoryDescription:a.descriptionModified,categoryId:a.category.categoryId},a.menu.restaurantId).then(function(){a.category.categoryName=a.nameModified,a.category.categoryDescription=a.descriptionModified,a.editing=!1})},a.sortMenuItem=function(c){var d=null,e=c.sortList;a.setAlert({showCover:!0,alertContent:"排序中..."}),e.forEach(function(a,b){a.id===c.dragNodeId&&b>0&&(d=c.sortList[b-1].id)}),b.sortMenuItem({itemId:c.dragNodeId,previousItemId:d,categoryId:a.category.categoryId},a.menu.restaurantId).then(function(){var b=[];e.forEach(function(c){b.push(a.getMenuItem(c.id))}),a.category.items=b,a.setAlert({showCover:!1})})},a.getMenuItem=function(b){var c;return a.category.items.some(function(a){return a.itemId===b?(c=a,!0):void 0}),c},a.deleteStatus=a.REQUEST_STATUS.INIT,a.removeMenuCategory=function(){b.removeMenuCategory(a.category.categoryId,a.menu.restaurantId).then(function(){a.menu.menuCategories=a.menu.menuCategories.filter(function(b){return b.categoryId!==a.category.categoryId})})},a.$on("collapse",function(b,c){a.collapse=c}),a.cancelEditCategory=function(){a.nameModified=a.category.categoryName,a.descriptionModified=a.category.categoryDescription,a.categoryEditForm.$setPristine(),a.editing=!1},a.addNewItem=function(){a.addingNewItem||(a.addingNewItem=!0,a.addMenuItemStatus=a.REQUEST_STATUS.INIT,a.menuItemForm={},a.menuItemFormValidation.$setPristine())},a.confirmAddItem=function(c){c&&b.addMenuItem(angular.extend(a.menuItemForm,{categoryId:a.category.categoryId}),a.menu.restaurantId).then(function(b){a.category.items=a.category.items.concat(b.results),a.addingNewItem=!1})},a.cancelAddItem=function(){a.addingNewItem=!1},a.toggleMenuCategory=function(a){$("#"+a).collapse("toggle")}}])});