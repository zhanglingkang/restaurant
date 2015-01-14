"use strict"

define(function (require) {
    var app = require("app")
    var audioService = ['$document', function ($document) {

        return {
            /**
             *
             * @param {Object} config
             * @param {Object} config.src 视频地址
             * @returns {{play: play, pause: pause}}
             */
            create: function (config) {
                var audio = new Audio()
                config = config || {}
                angular.forEach(config, function (value, key) {
                    audio[key] = value
                })
                return {
                    play: function () {
                        audio.play()
                    },
                    pause: function () {
                        audio.pause()
                    }
                }
            }
        }
    }]
    app.service("audioService", audioService)
})