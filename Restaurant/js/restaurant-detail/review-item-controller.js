"use strict"

define(function (require) {
    var app = require("app")
    require("./review-service")
    app.controller('reviewItemController', ['$scope', 'reviewService',
        function ($scope, reviewService) {
            $scope.replying = false
            $scope.reply = function () {
                if ($scope.replying)
                    return
                $scope.replying = true
            }
            $scope.confirmReply = function () {
                $scope.review.replyMessage = $scope.message
                $scope.replying = false
                reviewService.replyReview($scope.restaurantId, $scope.review.reviewIndex, $scope.message).success(function (error, result) {
                    $scope.saved = true
                }).error(function () {
                    $scope.saved = false
                })
            }
            $scope.cancelReply = function () {
                $scope.review.replyMessage = null
                $scope.replying = false
            }
        }
    ])

})