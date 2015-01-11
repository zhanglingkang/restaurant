"use strict"

define(function (require) {
    var app = require("app")
    require("./picture-service")
    app.controller('pictureItemController', [
        '$cookies', '$scope', 'pictureService', function ($cookies, $scope, pictureService) {
            $scope.file.pictureCommentCopy = $scope.file.pictureComment;
            $scope.modifyIntroduce = function (valid) {
                if (valid) {
                    pictureService.modifyIntroduce({
                        pictureId: $scope.file.pictureId,
                        pictureComment: $scope.file.pictureCommentCopy,
                        restaurantId: $scope.file.restaurantId
                    }).then(function () {
                        $scope.file.pictureComment = $scope.file.pictureCommentCopy;
                        $scope.popoverScope.close();
                    }, function () {
                    })
                }
            }
        }
    ])
})