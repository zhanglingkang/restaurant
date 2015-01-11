"use strict"

define(function (require) {
    var app = require("app")
    require("./picture-service")
    app.controller('fileUploader', ['$cookies', '$scope', 'pictureService', 'FileUploader',
        function ($cookies, $scope, pictureService, FileUploader) {
            var fd = new FormData()
            fd.append('sessionId', $cookies.token)
            fd.append('restaurantId', $scope.restaurantId)
            $scope.uploader = new FileUploader({
                url: pictureService.FILE_SERVER_URL,
                formData: [
                    {
                        sessionId: $cookies.token
                    },
                    {
                        restaurantId: $scope.restaurantId
                    },
                    {
                        userId: $cookies.username
                    }
                ],
                filter: [
                    {
                        name: "commentIsRequired",
                        fn: function (item) {
                            return !!item.pictureComment
                        }
                    }
                ]
            })
//        $scope.upload = function () {
//            pictureService.upload($scope.files, $scope.restaurantId)
//        }
            $scope.fileList = []
            $scope.uploader.onBeforeUploadItem = function (fileItem) {
                fileItem.formData.push({
                    pictureComment: fileItem.pictureComment
                })
            }
            $scope.upload = function (fileItem) {
                fileItem.wantUpload = true
                if (fileItem.pictureComment) {
                    fileItem.upload()
                }
            }
            $scope.uploadAll = function () {
                $scope.uploader.queue.forEach(function (item) {
                    if (!item.isSuccess) {
                        $scope.upload(item)
                    }
                })
            }
            $scope.uploader.onSuccessItem = function (item, response, status, headers) {
                var results = JSON.parse(response.data).results
                $scope.fileList = $scope.fileList.concat(results)
            }
            pictureService.getPictures($scope.restaurantId).then(function (data) {
                angular.forEach(data.results[0].uploadedPictures, function (item, index) {
                    $scope.fileList.push(item)
                })
            })
            $scope.removePicture = function (file) {
                pictureService.removePicture({
                    restaurantId: $scope.restaurantId,
                    pictureId: file.pictureId
                }).then(function () {
                    $scope.fileList = $scope.fileList.filter(function (item) {
                        return item.pictureId != file.pictureId
                    })
                })
            }
//        restaurantService.getMyRestaurantList().then(function (data) {
//            data.results[0].uploadedPictures.forEach(function (picture) {
//                $scope.filePathList.push(picture.filePath)
//            })
//        })
        }
    ])
})
