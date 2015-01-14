"use strict"

define(function (require) {
    var app = require("app")
    app.factory('reviewService', [
        '$window', '$cookies', "httpService", function ($window, $cookies, httpService) {
            return {
                getReviewList: function (restaurantId, pageNum) {

                    return httpService.post({
                        command: "getRestaurantReviewList",
                        data: {
                            restaurantId: restaurantId,
                            startIndex: pageNum * 10 + 1, size: 10
                        }
                    }).error(function (error) {
                        console.log('encounted error in getReviews: ' + error)
                    })
                },
                replyReview: function (restaurantId, reviewId, message) {
                    return httpService.post({
                        command: "replyRestaurantReview",
                        data: {
                            restaurantId: restaurantId,
                            reviewId: Number(reviewId),
                            replyMessage: message
                        }
                    }).error(function (error) {
                        console.log('encounted error in getReviews: ' + error)
                    })
                }
            }
        }])
})