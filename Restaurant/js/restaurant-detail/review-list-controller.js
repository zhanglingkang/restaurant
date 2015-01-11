"use strict"

define(function (require) {
    var app = require("app")
    require("./review-service")
    app.controller('reviewListController', ['$scope', '$routeParams', '$timeout', 'reviewService',
        function ($scope, $routeParams, $timeout, reviewService) {
            $scope.loading = true
            $scope.currentPage = 1
            $scope.selectPage = function (pageNum) {
                reviewService.getReviewList($scope.restaurantId, pageNum - 1)
                    .success(
                    function (data) {
                        var reviewList = data.results
                        $scope.loading = false
                        $scope.reviewList = reviewList
                        $scope.reviewList.forEach(function (review) {
                            review.rating /= 2
                        })
                    })
            }
            $scope.selectPage(1)
        }
    ])
})