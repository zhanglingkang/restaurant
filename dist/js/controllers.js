/*! ppz_website 2014-12-02 2:52:39 PM */
!function(){var a=angular.module("ppzControllers",[]);a.controller("appController",["$rootScope","$scope","$cookies","$location",function(a,b,c,d){function e(){return!(!c.token||"null"===c.token)}a.REQUEST_STATUS={INIT:0,REQUESTING:1,REQUEST_SUCCESSED:2,REQUEST_FAILED:3},a.KEY_CODE={ENTER:13,BACKSPACE:8,TOP:38,RIGHT:39,BOTTOM:40,LEFT:37},a.showCover=!1,a.alertType="alert-info",a.alertContent="",a.setAlert=function(b){a.showCover=b.showCover||!1,a.alertType=b.alertType||"alert-info",a.alertContent=b.alertContent||""},b.isLogined=e,b.$on("$locationChangeStart",function(a,b){e()||/login/.test(b)||d.path("/login")})}]),a.controller("loginController",["$scope","Login","$window","$location","$cookies",function(a,b,c,d,e){a.getUserName=function(){return e.username},a.resetPasswordForm={userName:""},a.submitted=!1,a.initResetInfo=function(){a.resetPasswordForm.userName="",a.resetStatus=a.REQUEST_STATUS.INIT,a.submitted=!1},a.resetStatus=a.REQUEST_STATUS.INIT,a.resetPassword=function(c){a.submitted=!0,c&&(a.resetStatus=a.REQUEST_STATUS.REQUESTING,b.resetPassword(a.resetPasswordForm.userName,function(){a.resetStatus=a.REQUEST_STATUS.REQUEST_SUCCESSED},function(b){a.resetStatus=a.REQUEST_STATUS.REQUEST_FAILED,a.resetHint=b.message}))},a.loginStatus=a.REQUEST_STATUS.INIT,a.performLogin=function(){var c=b;a.loginHintShow=!0,a.loginStatus=a.REQUEST_STATUS.REQUESTING,c.login(a.username,a.password).then(function(b){a.loginStatus=a.REQUEST_STATUS.REQUEST_SUCCESSED,console.log("login result "+b),console.log("token "+e.token),d.path("/myRestaurants")},function(b){a.loginStatus=a.REQUEST_STATUS.REQUEST_FAILED,console.log("login failed "+b)})},a.logout=function(){b.logout(function(){d.path("/login")})}}]),a.controller("restaurantListController",["$scope","RestaurantService","MenuService",function(a,b,c){a.loading=!0,a.includeHeader=!0,b.getMyRestaurantList().then(function(b){a.loading=!1,a.restaurantList=b.results,console.log("loading restaurantList"),a.restaurantList.forEach(function(a){c.getMenu(a.restaurantId)})},function(b){a.error=b})}]),a.controller("restaurantDetailController",["$scope","$routeParams","RestaurantService","MenuService",function(a,b,c){a.goBack=function(){window.history.back()},a.restaurantId=b.restaurantId,c.getRestaurant(a.restaurantId).then(function(b){a.restaurant=b,a.newInfo=angular.copy(a.restaurant)},function(b){a.error=b}),a.editing=!1,a.edit=function(){a.editing=!0},a.cancel=function(){a.newInfo=angular.copy(a.restaurant),a.editing=!1},a.confirm=function(){a.editing=!1,c.updateRestaurantInfo(a.restaurantId,a.newInfo).then(function(){a.saved=!0},function(){a.saved=!1})}}]),a.controller("menuController",["$scope","MenuService","$timeout",function(a,b,c){function d(b){return void(a.menu=b)}function e(){a.categoryForm={categoryName:"",categoryDescription:""}}a.adding=!1,a.importMenuFile=[],a.wantImport=!1,a.importStatus=a.REQUEST_STATUS.INIT,a.isExcel=function(){return/application\/.+office.+/.test(a.importMenuFile[0].type)},a.importMenu=function(){a.wantImport=!0,a.importMenuFile.length>0&&a.isExcel()&&(a.importStatus=a.REQUEST_STATUS.REQUESTING,b.importMenu(a.importMenuFile[0],a.restaurantId).then(function(){a.importStatus=a.REQUEST_STATUS.REQUEST_SUCCESSED},function(){a.importStatus=a.REQUEST_STATUS.REQUEST_FAILED}))},a.sortMenuCategoryStatus=a.REQUEST_STATUS.INIT,a.sortMenuCategory=function(c){var d=null,e=c.sortList;e.forEach(function(a,b){a.id===c.dragNodeId&&b>0&&(d=c.sortList[b-1].id)}),a.sortMenuCategoryStatus=a.REQUEST_STATUS.REQUESTING,a.setAlert({showCover:!0,alertContent:"排序中..."}),b.sortMenuCategory({categoryId:c.dragNodeId,previousCategoryId:d},a.menu.restaurantId).then(function(){a.sortMenuCategoryStatus=a.REQUEST_STATUS.REQUEST_SUCCESSED;var b=[];e.forEach(function(c){b.push(a.getMenuCategory(c.id))}),a.menu.menuCategories=b,a.setAlert({showCover:!1})},function(){a.sortMenuCategoryStatus=a.REQUEST_STATUS.REQUEST_FAILED,a.setAlert({showCover:!0,alertContent:"操作失败"})})},a.getMenuCategory=function(b){var c;return a.menu.menuCategories.some(function(a){return a.categoryId===b?(c=a,!0):void 0}),c},a.refreshMenu=function(){b.getMenu(a.restaurantId).then(function(a){d(a.results[0])},function(b){a.error=b})},a.refreshMenu(),a.collapseAll=function(b){a.$broadcast("collapse",b)},a.toAddMenuCategory=function(){a.adding=!0,a.addStatus=a.REQUEST_STATUS.INIT,e()},e(),a.addStatus=a.REQUEST_STATUS.INIT,a.addMenuCategory=function(){a.addStatus=a.REQUEST_STATUS.REQUESTING,b.addMenuCategory(a.categoryForm,a.menu.restaurantId).then(function(b){e(),a.addStatus=a.REQUEST_STATUS.REQUEST_SUCCESSED,a.menu.menuCategories=a.menu.menuCategories.concat(b.results),a.adding=!1},function(){a.addStatus=a.REQUEST_STATUS.REQUEST_FAILED})}}]),a.controller("menuCategoryController",["$scope","MenuService",function(a,b){a.addingNewItem=!1,a.editing=!1,a.nameModified=a.category.categoryName,a.descriptionModified=a.category.categoryDescription,a.editCategory=function(){a.editing=!0,a.editStatus=a.REQUEST_STATUS.INIT},a.confirmEditCategory=function(){a.editStatus=a.REQUEST_STATUS.REQUESTING,b.modifyMenuCategory({categoryName:a.nameModified,categoryDescription:a.descriptionModified,categoryId:a.category.categoryId},a.menu.restaurantId).then(function(){a.editStatus=a.REQUEST_STATUS.REQUEST_SUCCESSED,a.category.categoryName=a.nameModified,a.category.categoryDescription=a.descriptionModified,a.editing=!1},function(){a.editStatus=a.REQUEST_STATUS.REQUEST_FAILED})},a.sortMenuItem=function(c){var d=null,e=c.sortList;a.setAlert({showCover:!0,alertContent:"排序中..."}),e.forEach(function(a,b){a.id===c.dragNodeId&&b>0&&(d=c.sortList[b-1].id)}),b.sortMenuItem({itemId:c.dragNodeId,previousItemId:d,categoryId:a.category.categoryId},a.menu.restaurantId).then(function(){var b=[];e.forEach(function(c){b.push(a.getMenuItem(c.id))}),a.category.items=b,a.setAlert({showCover:!1})})},a.getMenuItem=function(b){var c;return a.category.items.some(function(a){return a.itemId===b?(c=a,!0):void 0}),c},a.deleteStatus=a.REQUEST_STATUS.INIT,a.removeMenuCategory=function(){a.deleteStatus=a.REQUEST_STATUS.REQUESTING,b.removeMenuCategory(a.category.categoryId,a.menu.restaurantId).then(function(){a.editStatus=a.REQUEST_STATUS.REQUEST_SUCCESSED,a.menu.menuCategories=a.menu.menuCategories.filter(function(b){return b.categoryId!==a.category.categoryId})},function(){a.editStatus=a.REQUEST_STATUS.REQUEST_FAILED})},a.$on("collapse",function(b,c){a.collapse=c}),a.cancelEditCategory=function(){a.nameModified=a.category.categoryName,a.descriptionModified=a.category.categoryDescription,a.categoryEditForm.$setPristine(),a.editing=!1},a.addNewItem=function(){a.addingNewItem||(a.addingNewItem=!0,a.addMenuItemStatus=a.REQUEST_STATUS.INIT,a.menuItemForm={},a.menuItemFormValidation.$setPristine())},a.confirmAddItem=function(c){c&&(a.addMenuItemStatus=a.REQUEST_STATUS.REQUESTING,b.addMenuItem(angular.extend(a.menuItemForm,{categoryId:a.category.categoryId}),a.menu.restaurantId).then(function(b){a.addMenuItemStatus=a.REQUEST_STATUS.REQUEST_SUCCESSED,a.category.items=a.category.items.concat(b.results),a.addingNewItem=!1},function(){a.addMenuItemStatus=a.REQUEST_STATUS.REQUEST_FAILED}))},a.cancelAddItem=function(){a.addingNewItem=!1},a.toggleMenuCategory=function(a){$("#"+a).collapse("toggle")}}]),a.controller("menuItemController",["$scope","MenuService",function(a,b){a.editing=!1,a.newItem=angular.copy(a.item),a.editItem=function(){a.editing||(a.editing=!0)},a.confirmEditItem=function(){a.editMenuItemStatus=a.REQUEST_STATUS.REQUESTING,b.modifyMenuItem({itemId:a.newItem.itemId,itemName:a.newItem.itemName,itemDescription:a.newItem.itemDescription,price:a.newItem.price,categoryId:a.category.categoryId},a.menu.restaurantId).then(function(){a.editMenuItemStatus=a.REQUEST_STATUS.REQUEST_SUCCESSED,a.item.itemName=a.newItem.itemName,a.item.itemDescription=a.newItem.itemDescription,a.item.price=a.newItem.price,a.editing=!1},function(){a.editMenuItemStatus=a.REQUEST_STATUS.REQUEST_FAILED})},a.cancelEditItem=function(){a.newItem=angular.copy(a.item),a.editing=!1},a.removeItem=function(){b.removeMenuItem({itemId:a.item.itemId,categoryId:a.category.categoryId},a.menu.restaurantId).then(function(){a.category.items=a.category.items.filter(function(b){return b.itemId!==a.item.itemId})})}}]),a.controller("waitingListController",["$modal","$scope","$routeParams","$timeout","$window","RestaurantService","WaitingListService",function(a,c,d,e,f,g,h){var i=1e4,j=null;c.goBack=function(){window.history.back()},c.restaurantId=d.restaurantId,g.getRestaurant(c.restaurantId).then(function(a){c.partyTypeList=a.partyTypeInfos,c.newReserve.typeId=c.partyTypeList[0].partyTypeId,c.restaurant=a,c.maxQueueLength=a.restaurantSettings.maxQueueLength},function(){c.error=error}),c.setMaxQueue=function(a){a&&g.setMaxQueue(c.restaurantId,c.maxQueueLength).success(function(){c.restaurant.restaurantSettings.maxQueueLength=c.maxQueueLength,c.closePopover=!0})},c.stopReservation=function(){g.acceptReservation(c.restaurantId,!1).success(function(){c.restaurant.restaurantSettings.acceptReservation=!1})},c.startReservation=function(){g.acceptReservation(c.restaurantId,!0).success(function(){c.restaurant.restaurantSettings.acceptReservation=!0})},c.stopQueue=function(){g.enableQueue(c.restaurantId,!1).success(function(){c.restaurant.restaurantSettings.enableQueue=!1})},c.startQueue=function(){g.enableQueue(c.restaurantId,!0).success(function(){c.restaurant.restaurantSettings.enableQueue=!0})},c.waitingList=[],c.newReserve={time:new Date,typeId:""};var k=function(){g.getWaitingList(c.restaurantId,function(a,b){c.error=a,c.waitingList=b.waitingList,c.reservationList=b.reservationList,c.completeList=b.completeList})},l=function(){e(function(){k(),l()},i)};c.call=function(a,b){j&&(j.lastCalledUnit=a,j.lastCalledUnitPrefix=b),h.callUser(c.restaurantId,a.unitId,function(b,c){b||(a.callCount=c.callCount)})},c.openPublicWaitListWindow=function(){j=f.open("#/publicWaitList/"+c.restaurantId),j.partyTypes=c.partyTypeList,j.lastCalledNumbers={};for(var a=0;a<j.partyTypes.length;a++){var b=j.partyTypes[a],d="--";c.waitingList[a+1].length>0&&(d=c.waitingList[a+1][0].unitId),j.lastCalledNumbers[b.unitIdPrefix]=d}},c.remove=function(a,b,d){var e=a[b],f=e.unitId.charAt(0),g=null;a[b+1]&&(g=a[b+1]),h.removeUser(c.restaurantId,e.unitId,d,function(c){null!=c?(alert(c),a.splice(b,1)):j&&0==b&&(j.lastReplacedUnit=g,j.lastReplacedUnitPrefix=f)})},c.addUser=function(a){var b=a?c.newReserve.time:null,d=c.newReserve.typeId;h.addUser(c.restaurantId,c.newReserve.name,c.newReserve.typeId,c.newReserve.phone,b,function(b,e){c.error=b,b||(a?c.reservationList.push(e):(0==c.waitingList[d].length&&j&&(j.lastReplacedUnit=e,j.lastReplacedUnitPrefix=e.unitId.charAt(0)),c.waitingList[d].push(e)),c.newReserve={time:new Date},c.reserveForm.$setPristine(),$("li[typeId="+d+"]").hide(),$("li[typeId="+d+"]").slideDown())})},c.openConfirmation=function(d,e,f){var g=a.open({templateUrl:"confirmationModal.html",size:"sm",controller:b,resolve:{queueUnit:function(){return d[e]}}});g.result.then(function(){c.remove(d,e,f)},function(){})},c.openPrintView=function(a,b){var d=f.open("#/printNumber/"+a.unitId);if(b)d.printPartyTypeDescription=b.partyTypeDescription;else for(var e=a.unitId.charAt(0),g=0;g<c.partyTypeList.length;g++){var b=c.partyTypeList[g];if(e==b.unitIdPrefix){d.printPartyTypeDescription="(预约)"+b.partyTypeDescription;break}}d.printUnitId=a.unitId},k(),l()}]);var b=function(a,b,c){a.unit=c,a.ok=function(){b.close()},a.cancel=function(){b.dismiss("cancel")}};a.controller("publicWaitListController",["$rootScope","$scope","$timeout","$window",function(a,b,c,d){b.partyTypes=d.partyTypes,a.excludeHeader=!0,b.lastCalledNumbers=d.lastCalledNumbers,b.panelTypes={};for(var e=0;e<b.partyTypes.length;e++){var f=b.partyTypes[e];b.panelTypes[f.unitIdPrefix]="panel-info"}console.log(JSON.stringify(b.lastCalledNumbers));var g=1e3,h=function(){d.lastReplacedUnitPrefix&&(b.lastCalledNumbers[d.lastReplacedUnitPrefix]=d.lastReplacedUnit?d.lastReplacedUnit.unitId:"--",d.lastReplacedUnitPrefix=null);var a=d.lastCalledUnit,c=b.currentPrefix,e=d.lastCalledUnitPrefix;if(e){var f=b.units,g=0;if(f||(b.units={},f=b.units),f[e]&&(g=f[e].callCount),g!=a.callCount){var h="现在叫号, "+a.unitId,i=new SpeechSynthesisUtterance(h);i.lang="zh-CN",window.speechSynthesis.speak(i)}c&&c!=e&&(b.panelTypes[c]="panel-info"),g!=a.callCount&&(b.lastCalledNumbers[e]=a.unitId,b.panelTypes[e]="panel-primary animate-flicker"),b.currentPrefix=e,f[e]=a}},i=function(){c(function(){h(),i()},g)};h(),i()}]),a.controller("reviewListController",["$scope","$routeParams","$timeout","ReviewService",function(a,b,c,d){a.loading=!0,a.currentPage=1,a.selectPage=function(b){d.getReviewList(a.restaurantId,b-1,function(b,c){a.loading=!1,a.error=b,a.reviewList=c})},a.selectPage(1)}]),a.controller("reviewItemController",["$scope","ReviewService",function(a,b){a.replying=!1,a.reply=function(){a.replying||(a.replying=!0)},a.confirmReply=function(){a.review.replyMessage=a.message,a.replying=!1,b.replyReview(a.restaurantId,a.review.reviewIndex,a.message,function(b){a.saved=b?!1:!0})},a.cancelReply=function(){a.review.replyMessage=null,a.replying=!1}}]),a.controller("printNumberController",["$scope","$window","$rootScope","$timeout",function(a,b,c,d){c.excludeHeader=!0,a.partyTypeDescription=b.printPartyTypeDescription,a.unitId=b.printUnitId,d(function(){window.print()},.5)}]),a.controller("fileUploader",["$cookies","$scope","FileUploadService","FileUploader",function(a,b,c,d){var e=new FormData;e.append("sessionId",a.token),e.append("restaurantId",b.restaurantId),b.uploader=new d({url:c.FILE_SERVER_URL,formData:[{sessionId:a.token},{restaurantId:b.restaurantId},{userId:a.username}],filter:[{name:"commentIsRequired",fn:function(a){return!!a.pictureComment}}]}),b.fileList=[],b.uploader.onBeforeUploadItem=function(a){a.formData.push({pictureComment:a.pictureComment})},b.upload=function(a){a.wantUpload=!0,a.pictureComment&&a.upload()},b.uploadAll=function(){b.uploader.queue.forEach(function(a){a.isSuccess||b.upload(a)})},b.uploader.onSuccessItem=function(a,c){var d=JSON.parse(c.data).results;b.fileList=b.fileList.concat(d)},c.getPictures(b.restaurantId).then(function(a){angular.forEach(a.results[0].uploadedPictures,function(a){b.fileList.push(a)})}),b.removePicture=function(a){c.removePicture({restaurantId:b.restaurantId,pictureId:a.pictureId}).then(function(){b.fileList=b.fileList.filter(function(b){return b.pictureId!=a.pictureId})})}}]),a.controller("pictureItemController",["$cookies","$scope","FileUploadService",function(a,b,c){b.file.pictureCommentCopy=b.file.pictureComment,b.modifyIntroduce=function(a){a&&c.modifyIntroduce({pictureId:b.file.pictureId,pictureComment:b.file.pictureCommentCopy,restaurantId:b.file.restaurantId}).then(function(){b.file.pictureComment=b.file.pictureCommentCopy,b.popoverScope.close()},function(){})}}]),a.controller("manageAccountController",["$cookies","$scope","manageAccountService",function(a,b,c){b.submitted=!1,b.modifyPasswordForm={oldPassword:"",newPassword:"",againPassword:""},b.modifyPasswordStatus=b.REQUEST_STATUS.INIT,b.modifyPassword=function(a){b.submitted=!0,b.modifyPasswordStatus=b.REQUEST_STATUS.INIT,a&&b.modifyPasswordForm.newPassword===b.modifyPasswordForm.againPassword&&(b.modifyPasswordStatus=b.REQUEST_STATUS.REQUESTING,c.modifyPassword(b.modifyPasswordForm.oldPassword,b.modifyPasswordForm.newPassword,function(){b.modifyPasswordStatus=b.REQUEST_STATUS.REQUEST_SUCCESSED},function(a){b.modifyPasswordStatus=b.REQUEST_STATUS.REQUEST_FAILED,angular.isObject(a)&&17==a.code&&(b.failHint="旧密码不正确")}))},b.modifyEmailStatus=b.REQUEST_STATUS.INIT,b.wantModifyEmail=!1,b.modifyEmail=function(a){b.wantModifyEmail=!0,b.modifyEmailStatus=b.REQUEST_STATUS.INIT,a&&(b.modifyEmailStatus=b.REQUEST_STATUS.REQUESTING,c.modifyEmail(b.email,function(){b.modifyEmailStatus=b.REQUEST_STATUS.REQUEST_SUCCESSED},function(){b.modifyEmailStatus=b.REQUEST_STATUS.REQUEST_FAILED,b.modifyEmailHint="修改email失败"}))},c.getUserInfo().then(function(a){b.email=a.results[0].email})}])}();