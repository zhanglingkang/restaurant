"use strict"

define(function (require) {
    var app = require("app")
    app.factory('pictureService', [ '$window', '$cookies', 'httpService',
        function ($window, $cookies, httpService) {
            return {
                upload: function (file, restaurantId) {
                    return httpService.post({
                        url: httpService.FILE_SERVER_URL,
                        isForm: true,
                        data: {
                            restaurantId: restaurantId,
                            file: file
                        }
                    })
                },
                getPictures: function (restaurantId) {
                    return httpService.post({
                        command: "getRestaurantPicture",
                        data: {
                            restaurantId: restaurantId
                        }
                    })
                },
                /**
                 *
                 * @param {Object} removeForm
                 * @param {String} removeForm.pictureId
                 * @param {String} removeForm.restaurantId
                 */
                removePicture: function (removeForm) {
                    return httpService.post({
                        command: "removeRestaurantPicture",
                        data: removeForm
                    })
                },
                /**
                 * @param {Object} pictureCommentForm
                 * @param {String} pictureCommentForm.pictureId
                 * @param {String} pictureCommentForm.pictureComment
                 * @param {String} pictureCommentForm.restaurantId
                 */
                modifyIntroduce: function (pictureCommentForm) {
                    return httpService.post({
                        command: "modifyRestaurantPictureComment",
                        data: pictureCommentForm
                    })
                }
            }
        }])
})